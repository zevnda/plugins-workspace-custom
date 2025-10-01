// Copyright 2019-2023 Tauri Programme within The Commons Conservancy
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT

import MobileCoreServices
import Photos
import PhotosUI
import SwiftRs
import Tauri
import UIKit
import WebKit

enum FilePickerEvent {
  case selected([URL])
  case cancelled
  case error(String)
}

struct MessageDialogOptions: Decodable {
  var title: String?
  let message: String
  var okButtonLabel: String?
  var noButtonLabel: String?
  var cancelButtonLabel: String?
}

struct Filter: Decodable {
  var extensions: [String]?
}

struct FilePickerOptions: Decodable {
  var multiple: Bool?
  var filters: [Filter]?
  var defaultPath: String?
}

struct SaveFileDialogOptions: Decodable {
  var fileName: String?
  var defaultPath: String?
}

class DialogPlugin: Plugin {

  var filePickerController: FilePickerController!
  var onFilePickerResult: ((FilePickerEvent) -> Void)? = nil

  override init() {
    super.init()
    filePickerController = FilePickerController(self)
  }

  @objc public func showFilePicker(_ invoke: Invoke) throws {
    let args = try invoke.parseArgs(FilePickerOptions.self)

    let parsedTypes = parseFiltersOption(args.filters ?? [])

    var isMedia = !parsedTypes.isEmpty
    var uniqueMimeType: Bool? = nil
    var mimeKind: String? = nil
    if !parsedTypes.isEmpty {
      uniqueMimeType = true
      for mime in parsedTypes {
        let kind = mime.components(separatedBy: "/")[0]
        if kind != "image" && kind != "video" {
          isMedia = false
        }
        if mimeKind == nil {
          mimeKind = kind
        } else if mimeKind != kind {
          uniqueMimeType = false
        }
      }
    }

    onFilePickerResult = { (event: FilePickerEvent) -> Void in
      switch event {
      case .selected(let urls):
        invoke.resolve(["files": urls])
      case .cancelled:
        invoke.resolve(["files": nil])
      case .error(let error):
        invoke.reject(error)
      }
    }

    if uniqueMimeType == true || isMedia {
      DispatchQueue.main.async {
        if #available(iOS 14, *) {
          var configuration = PHPickerConfiguration(photoLibrary: PHPhotoLibrary.shared())
          configuration.selectionLimit = (args.multiple ?? false) ? 0 : 1

          if uniqueMimeType == true {
            if mimeKind == "image" {
              configuration.filter = .images
            } else if mimeKind == "video" {
              configuration.filter = .videos
            }
          }

          let picker = PHPickerViewController(configuration: configuration)
          picker.delegate = self.filePickerController
          picker.modalPresentationStyle = .fullScreen
          self.presentViewController(picker)
        } else {
          let picker = UIImagePickerController()
          picker.delegate = self.filePickerController

          if uniqueMimeType == true && mimeKind == "image" {
            picker.sourceType = .photoLibrary
          }

          picker.sourceType = .photoLibrary
          picker.modalPresentationStyle = .fullScreen
          self.presentViewController(picker)
        }
      }
    } else {
      let documentTypes = parsedTypes.isEmpty ? ["public.data"] : parsedTypes
      DispatchQueue.main.async {
        let picker = UIDocumentPickerViewController(documentTypes: documentTypes, in: .import)
        if let defaultPath = args.defaultPath {
          picker.directoryURL = URL(string: defaultPath)
        }
        picker.delegate = self.filePickerController
        picker.allowsMultipleSelection = args.multiple ?? false
        picker.modalPresentationStyle = .fullScreen
        self.presentViewController(picker)
      }
    }
  }

  @objc public func saveFileDialog(_ invoke: Invoke) throws {
    let args = try invoke.parseArgs(SaveFileDialogOptions.self)

    // The Tauri save dialog API prompts the user to select a path where a file must be saved
    // This behavior maps to the operating system interfaces on all platforms except iOS,
    // which only exposes a mechanism to "move file `srcPath` to a location defined by the user"
    //
    // so we have to work around it by creating an empty file matching the requested `args.fileName`,
    // and using it as `srcPath` for the operation - returning the path the user selected
    // so the app dev can write to it later - matching cross platform behavior as mentioned above
    let fileManager = FileManager.default
    let srcFolder = fileManager.urls(for: .documentDirectory, in: .userDomainMask).first!
    let srcPath = srcFolder.appendingPathComponent(args.fileName ?? "file")
    if !fileManager.fileExists(atPath: srcPath.path) {
      // the file contents must be actually provided by the tauri dev after the path is resolved by the save API
      try "".write(to: srcPath, atomically: true, encoding: .utf8)
    }

    onFilePickerResult = { (event: FilePickerEvent) -> Void in
      switch event {
      case .selected(let urls):
        invoke.resolve(["file": urls.first!])
      case .cancelled:
        invoke.resolve(["file": nil])
      case .error(let error):
        invoke.reject(error)
      }
    }

    DispatchQueue.main.async {
      let picker = UIDocumentPickerViewController(url: srcPath, in: .exportToService)
      if let defaultPath = args.defaultPath {
        picker.directoryURL = URL(string: defaultPath)
      }
      picker.delegate = self.filePickerController
      picker.modalPresentationStyle = .fullScreen
      self.presentViewController(picker)
    }
  }

  private func presentViewController(_ viewControllerToPresent: UIViewController) {
    self.manager.viewController?.present(viewControllerToPresent, animated: true, completion: nil)
  }

  private func parseFiltersOption(_ filters: [Filter]) -> [String] {
    var parsedTypes: [String] = []
    for filter in filters {
      for ext in filter.extensions ?? [] {
        guard
          let utType: String = UTTypeCreatePreferredIdentifierForTag(
            kUTTagClassMIMEType, ext as CFString, nil)?.takeRetainedValue() as String?
        else {
          continue
        }
        parsedTypes.append(utType)
      }
    }
    return parsedTypes
  }

  public func onFilePickerEvent(_ event: FilePickerEvent) {
    self.onFilePickerResult?(event)
  }

  @objc public func showMessageDialog(_ invoke: Invoke) throws {
    let manager = self.manager
    let args = try invoke.parseArgs(MessageDialogOptions.self)

    DispatchQueue.main.async { [] in
      let alert = UIAlertController(
        title: args.title, message: args.message, preferredStyle: UIAlertController.Style.alert)

      if let cancelButtonLabel = args.cancelButtonLabel {
        alert.addAction(
          UIAlertAction(
            title: cancelButtonLabel, style: UIAlertAction.Style.default,
            handler: { (_) -> Void in
              invoke.resolve(["value": cancelButtonLabel])
            }
          )
        )
      }

      if let noButtonLabel = args.noButtonLabel {
        alert.addAction(
          UIAlertAction(
            title: noButtonLabel, style: UIAlertAction.Style.default,
            handler: { (_) -> Void in
              invoke.resolve(["value": noButtonLabel])
            }
          )
        )
      }

      let okButtonLabel = args.okButtonLabel ?? "Ok"
      alert.addAction(
        UIAlertAction(
          title: okButtonLabel, style: UIAlertAction.Style.default,
          handler: { (_) -> Void in
            invoke.resolve(["value": okButtonLabel])
          }
        )
      )

      manager.viewController?.present(alert, animated: true, completion: nil)
    }
  }
}

@_cdecl("init_plugin_dialog")
func initPlugin() -> Plugin {
  return DialogPlugin()
}
