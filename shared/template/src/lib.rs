// Copyright 2019-2023 Tauri Programme within The Commons Conservancy
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT

use tauri::{
  plugin::{Builder, TauriPlugin},
  Manager, Runtime,
};

pub use models::*;

#[cfg(desktop)]
mod desktop;
#[cfg(mobile)]
mod mobile;

mod commands;
mod error;
mod models;

pub use error::{Error, Result};

#[cfg(desktop)]
pub use desktop::{{ plugin_name_pascal_case }};
#[cfg(mobile)]
pub use mobile::{{ plugin_name_pascal_case }};

/// Extensions to [`tauri::App`], [`tauri::AppHandle`], [`tauri::WebviewWindow`], [`tauri::Webview`] and [`tauri::Window`] to access the {{ plugin_name }} APIs.
pub trait {{ plugin_name_pascal_case }}Ext<R: Runtime> {
  fn {{ plugin_name_snake_case }}(&self) -> &{{ plugin_name_pascal_case }}<R>;
}

impl<R: Runtime, T: Manager<R>> crate::{{ plugin_name_pascal_case }}Ext<R> for T {
  fn {{ plugin_name_snake_case }}(&self) -> &{{ plugin_name_pascal_case }}<R> {
    self.state::<{{ plugin_name_pascal_case }}<R>>().inner()
  }
}

/// Initializes the plugin.
pub fn init<R: Runtime>() -> TauriPlugin<R> {
  Builder::new("{{ plugin_name }}")
    .invoke_handler(tauri::generate_handler![commands::execute])
    .setup(|app, api| {
      #[cfg(mobile)]
      let {{ plugin_name_snake_case }} = mobile::init(app, api)?;
      #[cfg(desktop)]
      let {{ plugin_name_snake_case }} = desktop::init(app, api)?;
      app.manage({{ plugin_name_snake_case }});
      Ok(())
    })
    .build()
}
