![haptics](https://github.com/tauri-apps/plugins-workspace/raw/v2/plugins/haptics/banner.png)

Haptic feedback and vibrations on Android and iOS.

There are no standards/requirements for vibration support on Android, so the `feedback` APIs may not work correctly on more affordable phones, including recently released ones.

| Platform | Supported |
| -------- | --------- |
| Linux    | x         |
| Windows  | x         |
| macOS    | x         |
| Android  | ✓         |
| iOS      | ✓         |

## Install

_This plugin requires a Rust version of at least **1.77.2**_

There are three general methods of installation that we can recommend.

1. Use crates.io and npm (easiest, and requires you to trust that our publishing pipeline worked)
2. Pull sources directly from Github using git tags / revision hashes (most secure)
3. Git submodule install this repo in your tauri project and then use file protocol to ingest the source (most secure, but inconvenient to use)

Install the Core plugin by adding the following to your `Cargo.toml` file:

`src-tauri/Cargo.toml`

```toml
[dependencies]
tauri-plugin-haptics = "2.0.0"
# alternatively with Git:
tauri-plugin-haptics = { git = "https://github.com/tauri-apps/plugins-workspace", branch = "v2" }
```

You can install the JavaScript Guest bindings using your preferred JavaScript package manager:

<!-- Add the branch for installations using git! -->

```sh
pnpm add @tauri-apps/plugin-haptics
# or
npm add @tauri-apps/plugin-haptics
# or
yarn add @tauri-apps/plugin-haptics
```

## Usage

First you need to register the core plugin with Tauri:

`src-tauri/src/lib.rs`

```rust
fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_haptics::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

Second, add the required permissions in the project:

`src-tauri/capabilities/default.json`

```json
  "permissions": [
    "haptics:allow-impact-feedback",
    "haptics:allow-notification-feedback",
    "haptics:allow-selection-feedback",
    "haptics:allow-vibrate"
  ]
```

Afterwards all the plugin's APIs are available through the JavaScript guest bindings:

```javascript
import {
  vibrate,
  impactFeedback,
  notificationFeedback,
  selectionFeedback
} from '@tauri-apps/plugin-haptics'

await vibrate(1)
await impactFeedback('medium')
await notificationFeedback('warning')
await selectionFeedback()
```

## Contributing

PRs accepted. Please make sure to read the Contributing Guide before making a pull request.

## Contributed By

<table>
  <tbody>
    <tr>
      <td align="center" valign="middle">
        <a href="https://crabnebula.dev" target="_blank">
          <img src="contributors/crabnebula.svg" alt="CrabNebula" width="283">
        </a>
      </td>
      <td align="center" valign="middle">
        <a href="https://rescue.co" target="_blank">
            <img src="contributors/rescue.png" alt="Rescue.co" width="283" height="90">
        </a>
      </td>
    </tr>
  </tbody>
</table>

## Partners

<table>
  <tbody>
    <tr>
      <td align="center" valign="middle">
        <a href="https://crabnebula.dev" target="_blank">
          <img src="https://github.com/tauri-apps/plugins-workspace/raw/v2/.github/sponsors/crabnebula.svg" alt="CrabNebula" width="283">
        </a>
      </td>
    </tr>
  </tbody>
</table>

For the complete list of sponsors please visit our [website](https://tauri.app#sponsors) and [Open Collective](https://opencollective.com/tauri).

## License

Code: (c) 2015 - Present - The Tauri Programme within The Commons Conservancy.

MIT or MIT/Apache 2.0 where applicable.
