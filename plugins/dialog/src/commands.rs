// Copyright 2019-2023 Tauri Programme within The Commons Conservancy
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT

use std::path::PathBuf;

use serde::{Deserialize, Serialize};
use tauri::{command, Manager, Runtime, State, Window};
use tauri_plugin_fs::FsExt;

use crate::{
    Dialog, FileDialogBuilder, FilePath, MessageDialogBuilder, MessageDialogButtons,
    MessageDialogKind, MessageDialogResult, Result, CANCEL, NO, OK, YES,
};

#[derive(Serialize)]
#[serde(untagged)]
pub enum OpenResponse {
    #[cfg(desktop)]
    Folders(Option<Vec<FilePath>>),
    #[cfg(desktop)]
    Folder(Option<FilePath>),
    Files(Option<Vec<FilePath>>),
    File(Option<FilePath>),
}

#[allow(dead_code)]
#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DialogFilter {
    name: String,
    extensions: Vec<String>,
}

/// The options for the open dialog API.
#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct OpenDialogOptions {
    /// The title of the dialog window.
    title: Option<String>,
    /// The filters of the dialog.
    #[serde(default)]
    filters: Vec<DialogFilter>,
    /// Whether the dialog allows multiple selection or not.
    #[serde(default)]
    multiple: bool,
    /// Whether the dialog is a directory selection (`true` value) or file selection (`false` value).
    #[serde(default)]
    directory: bool,
    /// The initial path of the dialog.
    default_path: Option<PathBuf>,
    /// If [`Self::directory`] is true, indicates that it will be read recursively later.
    /// Defines whether subdirectories will be allowed on the scope or not.
    #[serde(default)]
    #[cfg_attr(mobile, allow(dead_code))]
    recursive: bool,
    /// Whether to allow creating directories in the dialog **macOS Only**
    can_create_directories: Option<bool>,
}

/// The options for the save dialog API.
#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
#[cfg_attr(mobile, allow(dead_code))]
pub struct SaveDialogOptions {
    /// The title of the dialog window.
    title: Option<String>,
    /// The filters of the dialog.
    #[serde(default)]
    filters: Vec<DialogFilter>,
    /// The initial path of the dialog.
    default_path: Option<PathBuf>,
    /// Whether to allow creating directories in the dialog **macOS Only**
    can_create_directories: Option<bool>,
}

#[cfg(mobile)]
fn set_default_path<R: Runtime>(
    mut dialog_builder: FileDialogBuilder<R>,
    default_path: PathBuf,
) -> FileDialogBuilder<R> {
    if let Some(file_name) = default_path.file_name() {
        dialog_builder = dialog_builder.set_file_name(file_name.to_string_lossy());
    }
    dialog_builder
}

#[cfg(desktop)]
fn set_default_path<R: Runtime>(
    mut dialog_builder: FileDialogBuilder<R>,
    default_path: PathBuf,
) -> FileDialogBuilder<R> {
    // we need to adjust the separator on Windows: https://github.com/tauri-apps/tauri/issues/8074
    let default_path: PathBuf = default_path.components().collect();
    if default_path.is_file() || !default_path.exists() {
        if let (Some(parent), Some(file_name)) = (default_path.parent(), default_path.file_name()) {
            if parent.components().count() > 0 {
                dialog_builder = dialog_builder.set_directory(parent);
            }
            dialog_builder = dialog_builder.set_file_name(file_name.to_string_lossy());
        } else {
            dialog_builder = dialog_builder.set_directory(default_path);
        }
        dialog_builder
    } else {
        dialog_builder.set_directory(default_path)
    }
}

#[command]
pub(crate) async fn open<R: Runtime>(
    window: Window<R>,
    dialog: State<'_, Dialog<R>>,
    options: OpenDialogOptions,
) -> Result<OpenResponse> {
    let mut dialog_builder = dialog.file();
    #[cfg(any(windows, target_os = "macos"))]
    {
        dialog_builder = dialog_builder.set_parent(&window);
    }
    if let Some(title) = options.title {
        dialog_builder = dialog_builder.set_title(title);
    }
    if let Some(default_path) = options.default_path {
        dialog_builder = set_default_path(dialog_builder, default_path);
    }
    if let Some(can) = options.can_create_directories {
        dialog_builder = dialog_builder.set_can_create_directories(can);
    }
    for filter in options.filters {
        let extensions: Vec<&str> = filter.extensions.iter().map(|s| &**s).collect();
        dialog_builder = dialog_builder.add_filter(filter.name, &extensions);
    }

    let res = if options.directory {
        #[cfg(desktop)]
        {
            let tauri_scope = window.state::<tauri::scope::Scopes>();

            if options.multiple {
                let folders = dialog_builder.blocking_pick_folders();
                if let Some(folders) = &folders {
                    for folder in folders {
                        if let Ok(path) = folder.clone().into_path() {
                            if let Some(s) = window.try_fs_scope() {
                                s.allow_directory(&path, options.recursive)?;
                            }
                            tauri_scope.allow_directory(&path, options.directory)?;
                        }
                    }
                }
                OpenResponse::Folders(
                    folders.map(|folders| folders.into_iter().map(|p| p.simplified()).collect()),
                )
            } else {
                let folder = dialog_builder.blocking_pick_folder();
                if let Some(folder) = &folder {
                    if let Ok(path) = folder.clone().into_path() {
                        if let Some(s) = window.try_fs_scope() {
                            s.allow_directory(&path, options.recursive)?;
                        }
                        tauri_scope.allow_directory(&path, options.directory)?;
                    }
                }
                OpenResponse::Folder(folder.map(|p| p.simplified()))
            }
        }
        #[cfg(mobile)]
        return Err(crate::Error::FolderPickerNotImplemented);
    } else if options.multiple {
        let tauri_scope = window.state::<tauri::scope::Scopes>();

        let files = dialog_builder.blocking_pick_files();
        if let Some(files) = &files {
            for file in files {
                if let Ok(path) = file.clone().into_path() {
                    if let Some(s) = window.try_fs_scope() {
                        s.allow_file(&path)?;
                    }

                    tauri_scope.allow_file(&path)?;
                }
            }
        }
        OpenResponse::Files(files.map(|files| files.into_iter().map(|f| f.simplified()).collect()))
    } else {
        let tauri_scope = window.state::<tauri::scope::Scopes>();
        let file = dialog_builder.blocking_pick_file();

        if let Some(file) = &file {
            if let Ok(path) = file.clone().into_path() {
                if let Some(s) = window.try_fs_scope() {
                    s.allow_file(&path)?;
                }
                tauri_scope.allow_file(&path)?;
            }
        }
        OpenResponse::File(file.map(|f| f.simplified()))
    };
    Ok(res)
}

#[allow(unused_variables)]
#[command]
pub(crate) async fn save<R: Runtime>(
    window: Window<R>,
    dialog: State<'_, Dialog<R>>,
    options: SaveDialogOptions,
) -> Result<Option<FilePath>> {
    let mut dialog_builder = dialog.file();
    #[cfg(desktop)]
    {
        dialog_builder = dialog_builder.set_parent(&window);
    }
    if let Some(title) = options.title {
        dialog_builder = dialog_builder.set_title(title);
    }
    if let Some(default_path) = options.default_path {
        dialog_builder = set_default_path(dialog_builder, default_path);
    }
    if let Some(can) = options.can_create_directories {
        dialog_builder = dialog_builder.set_can_create_directories(can);
    }
    for filter in options.filters {
        let extensions: Vec<&str> = filter.extensions.iter().map(|s| &**s).collect();
        dialog_builder = dialog_builder.add_filter(filter.name, &extensions);
    }

    let tauri_scope = window.state::<tauri::scope::Scopes>();

    let path = dialog_builder.blocking_save_file();
    if let Some(p) = &path {
        if let Ok(path) = p.clone().into_path() {
            if let Some(s) = window.try_fs_scope() {
                s.allow_file(&path)?;
            }
            tauri_scope.allow_file(&path)?;
        }
    }

    Ok(path.map(|p| p.simplified()))
}

fn message_dialog<R: Runtime>(
    #[allow(unused_variables)] window: Window<R>,
    dialog: State<'_, Dialog<R>>,
    title: Option<String>,
    message: String,
    kind: Option<MessageDialogKind>,
    buttons: MessageDialogButtons,
) -> MessageDialogBuilder<R> {
    let mut builder = dialog.message(message);

    builder = builder.buttons(buttons);

    if let Some(title) = title {
        builder = builder.title(title);
    }

    #[cfg(desktop)]
    {
        builder = builder.parent(&window);
    }

    if let Some(kind) = kind {
        builder = builder.kind(kind);
    }

    builder
}

#[command]
pub(crate) async fn message<R: Runtime>(
    window: Window<R>,
    dialog: State<'_, Dialog<R>>,
    title: Option<String>,
    message: String,
    kind: Option<MessageDialogKind>,
    ok_button_label: Option<String>,
    buttons: Option<MessageDialogButtons>,
) -> Result<MessageDialogResult> {
    let buttons = buttons.unwrap_or(if let Some(ok_button_label) = ok_button_label {
        MessageDialogButtons::OkCustom(ok_button_label)
    } else {
        MessageDialogButtons::Ok
    });

    Ok(message_dialog(window, dialog, title, message, kind, buttons).blocking_show_with_result())
}

#[command]
pub(crate) async fn ask<R: Runtime>(
    window: Window<R>,
    dialog: State<'_, Dialog<R>>,
    title: Option<String>,
    message: String,
    kind: Option<MessageDialogKind>,
    yes_button_label: Option<String>,
    no_button_label: Option<String>,
) -> Result<bool> {
    let dialog = message_dialog(
        window,
        dialog,
        title,
        message,
        kind,
        if let Some(yes_button_label) = yes_button_label {
            MessageDialogButtons::OkCancelCustom(
                yes_button_label,
                no_button_label.unwrap_or(NO.to_string()),
            )
        } else if let Some(no_button_label) = no_button_label {
            MessageDialogButtons::OkCancelCustom(YES.to_string(), no_button_label)
        } else {
            MessageDialogButtons::YesNo
        },
    );

    Ok(dialog.blocking_show())
}

#[command]
pub(crate) async fn confirm<R: Runtime>(
    window: Window<R>,
    dialog: State<'_, Dialog<R>>,
    title: Option<String>,
    message: String,
    kind: Option<MessageDialogKind>,
    ok_button_label: Option<String>,
    cancel_button_label: Option<String>,
) -> Result<bool> {
    let dialog = message_dialog(
        window,
        dialog,
        title,
        message,
        kind,
        if let Some(ok_button_label) = ok_button_label {
            MessageDialogButtons::OkCancelCustom(
                ok_button_label,
                cancel_button_label.unwrap_or(CANCEL.to_string()),
            )
        } else if let Some(cancel_button_label) = cancel_button_label {
            MessageDialogButtons::OkCancelCustom(OK.to_string(), cancel_button_label)
        } else {
            MessageDialogButtons::OkCancel
        },
    );

    Ok(dialog.blocking_show())
}
