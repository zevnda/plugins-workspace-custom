# Changelog

## \[2.4.0]

- [`6a8f2558`](https://github.com/tauri-apps/plugins-workspace/commit/6a8f25587852b958a9e48b8c2e8884cc94a7dc7f) ([#2619](https://github.com/tauri-apps/plugins-workspace/pull/2619) by [@Legend-Master](https://github.com/tauri-apps/plugins-workspace/../../Legend-Master)) Making `flags` optional in the `saveWindowState`, `restoreState`, `restoreStateCurrent` JavaScripts APIs, leaving it empty will make it use plugin's default flags

## \[2.3.0]

- [`f209b2f2`](https://github.com/tauri-apps/plugins-workspace/commit/f209b2f23cb29133c97ad5961fb46ef794dbe063) ([#2804](https://github.com/tauri-apps/plugins-workspace/pull/2804) by [@renovate](https://github.com/tauri-apps/plugins-workspace/../../renovate)) Updated tauri to 2.6

## \[2.2.3]

- [`f634e524`](https://github.com/tauri-apps/plugins-workspace/commit/f634e5248ebe428f8305a59f74c13fc15147fb8e) This is an "empty" release to update the plugins' source files on crates.io and docs.rs. This should fix docs.rs build failures for projects using tauri plugins as dependencies.

## \[2.2.2]

- [`a35fea50`](https://github.com/tauri-apps/plugins-workspace/commit/a35fea501560a3d126aad09b59600d9f1a731a9e) ([#2583](https://github.com/tauri-apps/plugins-workspace/pull/2583)) Fix window size gets bigger/smaller on secondary monitor with a different scaling than the primary one

## \[2.2.1]

- [`0ec895c3`](https://github.com/tauri-apps/plugins-workspace/commit/0ec895c378d4700cf8d7a002c6d9829f3c015b9f) ([#2330](https://github.com/tauri-apps/plugins-workspace/pull/2330) by [@thewh1teagle](https://github.com/tauri-apps/plugins-workspace/../../thewh1teagle)) Add `Builder::with_filter` callback to exclude specific windows from saving their state. This allows for more flexibility by enabling dynamic exclusion of windows based on custom logic.

## \[2.2.0]

- [`3a79266b`](https://github.com/tauri-apps/plugins-workspace/commit/3a79266b8cf96a55b1ae6339d725567d45a44b1d) ([#2173](https://github.com/tauri-apps/plugins-workspace/pull/2173) by [@FabianLars](https://github.com/tauri-apps/plugins-workspace/../../FabianLars)) Bumped all plugins to `v2.2.0`. From now, the versions for the Rust and JavaScript packages of each plugin will be in sync with each other.

## \[2.0.2]

- [`cfb3ec0e`](https://github.com/tauri-apps/plugins-workspace/commit/cfb3ec0e21cab8010fbc1d7ef82aa65d86c3cfa9) ([#2007](https://github.com/tauri-apps/plugins-workspace/pull/2007) by [@FabianLars](https://github.com/tauri-apps/plugins-workspace/../../FabianLars)) On macOS the plugin now (temporarily) ignores the maximized state for undecorated windows on resize events to fix app freezes.

## \[2.0.1]

- [`a1a82208`](https://github.com/tauri-apps/plugins-workspace/commit/a1a82208ed4ab87f83310be0dc95428aec9ab241) ([#1873](https://github.com/tauri-apps/plugins-workspace/pull/1873) by [@lucasfernog](https://github.com/tauri-apps/plugins-workspace/../../lucasfernog)) Downgrade MSRV to 1.77.2 to support Windows 7.

## \[2.0.0]

- [`e2c4dfb6`](https://github.com/tauri-apps/plugins-workspace/commit/e2c4dfb6af43e5dd8d9ceba232c315f5febd55c1) Update to tauri v2 stable release.

## \[2.0.0-rc.5]

- [`7a37355e`](https://github.com/tauri-apps/plugins-workspace/commit/7a37355e177772cbddf24397d5a23280e00558af) ([#1787](https://github.com/tauri-apps/plugins-workspace/pull/1787) by [@Legend-Master](https://github.com/tauri-apps/plugins-workspace/../../Legend-Master)) Fix deadlock when trying to restore window states on initial load

## \[2.0.0-rc.4]

- [`204e5aac`](https://github.com/tauri-apps/plugins-workspace/commit/204e5aacad7e8f99a9a08f4a45cfed83643c1cc0) ([#1743](https://github.com/tauri-apps/plugins-workspace/pull/1743)) Fix can't restore a minimized window's size and position properly

### breaking

- [`204e5aac`](https://github.com/tauri-apps/plugins-workspace/commit/204e5aacad7e8f99a9a08f4a45cfed83643c1cc0) ([#1743](https://github.com/tauri-apps/plugins-workspace/pull/1743)) Window's size is now stored in physical size instead of logical size

## \[2.0.0-rc.3]

- [`17e8014b`](https://github.com/tauri-apps/plugins-workspace/commit/17e8014b6993602ddad21e8f5dcb625de1eea2c0) ([#1702](https://github.com/tauri-apps/plugins-workspace/pull/1702) by [@Legend-Master](https://github.com/tauri-apps/plugins-workspace/../../Legend-Master)) Fix saving a minimized window's state changes its position to -32000

## \[2.0.0-rc.1]

- [`e2e97db5`](https://github.com/tauri-apps/plugins-workspace/commit/e2e97db51983267f5be84d4f6f0278d58834d1f5) ([#1701](https://github.com/tauri-apps/plugins-workspace/pull/1701) by [@lucasfernog](https://github.com/tauri-apps/plugins-workspace/../../lucasfernog)) Update to tauri 2.0.0-rc.8

## \[2.0.0-rc.1]

- [`2c00c029`](https://github.com/tauri-apps/plugins-workspace/commit/2c00c0292c9127b81567de46691e8c0f73557261) ([#1630](https://github.com/tauri-apps/plugins-workspace/pull/1630) by [@FabianLars](https://github.com/tauri-apps/plugins-workspace/../../FabianLars)) Fixed an issue that caused multi-word IIFE names to not be formatted correctly. For example the `barcode-scanner` was defined as `window.__TAURI_PLUGIN_CLIPBOARDMANAGER__` instead of `window.__TAURI_PLUGIN_CLIPBOARD_MANAGER__`.

## \[2.0.0-rc.0]

- [`9887d1`](https://github.com/tauri-apps/plugins-workspace/commit/9887d14bd0e971c4c0f5c1188fc4005d3fc2e29e) Update to tauri RC.

## \[2.0.0-beta.9]

- [`99d6ac0f`](https://github.com/tauri-apps/plugins-workspace/commit/99d6ac0f9506a6a4a1aa59c728157190a7441af6) ([#1606](https://github.com/tauri-apps/plugins-workspace/pull/1606) by [@FabianLars](https://github.com/tauri-apps/plugins-workspace/../../FabianLars)) The JS packages now specify the *minimum* `@tauri-apps/api` version instead of a single exact version.
- [`6de87966`](https://github.com/tauri-apps/plugins-workspace/commit/6de87966ecc00ad9d91c25be452f1f46bd2b7e1f) ([#1597](https://github.com/tauri-apps/plugins-workspace/pull/1597) by [@Legend-Master](https://github.com/tauri-apps/plugins-workspace/../../Legend-Master)) Update to tauri beta.25.

## \[2.0.0-beta.8]

- [`22a17980`](https://github.com/tauri-apps/plugins-workspace/commit/22a17980ff4f6f8c40adb1b8f4ffc6dae2fe7e30) ([#1537](https://github.com/tauri-apps/plugins-workspace/pull/1537) by [@lucasfernog](https://github.com/tauri-apps/plugins-workspace/../../lucasfernog)) Update to tauri beta.24.

## \[2.0.0-beta.7]

- [`76daee7a`](https://github.com/tauri-apps/plugins-workspace/commit/76daee7aafece34de3092c86e531cf9eb1138989) ([#1512](https://github.com/tauri-apps/plugins-workspace/pull/1512) by [@renovate](https://github.com/tauri-apps/plugins-workspace/../../renovate)) Update to tauri beta.23.

## \[2.0.0-beta.6]

- [`9013854f`](https://github.com/tauri-apps/plugins-workspace/commit/9013854f42a49a230b9dbb9d02774765528a923f)([#1382](https://github.com/tauri-apps/plugins-workspace/pull/1382)) Update to tauri beta.22.

## \[2.0.0-beta.5]

- [`430bd6f4`](https://github.com/tauri-apps/plugins-workspace/commit/430bd6f4f379bee5d232ae6b098ae131db7f178a)([#1363](https://github.com/tauri-apps/plugins-workspace/pull/1363)) Update to tauri beta.20.

## \[2.0.0-beta.7]

- [`d9de5b19`](https://github.com/tauri-apps/plugins-workspace/commit/d9de5b19d1e950c06f0915ae92a862acb266d108)([#1283](https://github.com/tauri-apps/plugins-workspace/pull/1283)) Implement `WindowExt` for `WebviewWindow`.

## \[2.0.0-beta.4]

- [`bd1ed590`](https://github.com/tauri-apps/plugins-workspace/commit/bd1ed5903ffcce5500310dac1e59e8c67674ef1e)([#1237](https://github.com/tauri-apps/plugins-workspace/pull/1237)) Update to tauri beta.17.

## \[2.0.0-beta.3]

- [`0e9541f`](https://github.com/tauri-apps/plugins-workspace/commit/0e9541fe8990395de7cc8887bc46b3f3665b44e1)([#1138](https://github.com/tauri-apps/plugins-workspace/pull/1138)) Add `Builder::with_filename` to support using a custom filename. Also add `AppHandleExt::file_name` and a similar function in JS, to retrieve it later.

## \[2.0.0-beta.4]

- [`c013fa5`](https://github.com/tauri-apps/plugins-workspace/commit/c013fa52cd66885cf457a64e75373cb2066bc849)([#1078](https://github.com/tauri-apps/plugins-workspace/pull/1078)) **Breaking change**: Changed the format of the state file from bincode to json. Also changed the filename to from `.window-state` to `.window-state.json`.

## \[2.0.0-beta.3]

- [`a04ea2f`](https://github.com/tauri-apps/plugins-workspace/commit/a04ea2f38294d5a3987578283badc8eec87a7752)([#1071](https://github.com/tauri-apps/plugins-workspace/pull/1071)) The global API script is now only added to the binary when the `withGlobalTauri` config is true.

## \[2.0.0-beta.2]

- [`99bea25`](https://github.com/tauri-apps/plugins-workspace/commit/99bea2559c2c0648c2519c50a18cd124dacef57b)([#1005](https://github.com/tauri-apps/plugins-workspace/pull/1005)) Update to tauri beta.8.

## \[2.0.0-beta.1]

- [`569defb`](https://github.com/tauri-apps/plugins-workspace/commit/569defbe9492e38938554bb7bdc1be9151456d21) Update to tauri beta.4.

## \[2.0.0-beta.0]

- [`d198c01`](https://github.com/tauri-apps/plugins-workspace/commit/d198c014863ee260cb0de88a14b7fc4356ef7474)([#862](https://github.com/tauri-apps/plugins-workspace/pull/862)) Update to tauri beta.

- [`14f59615`](https://github.com/tauri-apps/plugins-workspace/commit/14f5961569c7d759d8d6d836352c787484594bd5) Address a couple of issues with restoring positions:

  - Fix restoring window positions correctly when the top-left corner of the window was outside of the monitor.
  - Fix restore maximization state only maximized on main monitor.

## \[2.0.0-alpha.5]

- [`387c2f9`](https://github.com/tauri-apps/plugins-workspace/commit/387c2f9e0ce4c75c07ffa3fd76391a25b58f5daf)([#802](https://github.com/tauri-apps/plugins-workspace/pull/802)) Update to @tauri-apps/api v2.0.0-alpha.13.

## \[2.0.0-alpha.4]

- [`387c2f9`](https://github.com/tauri-apps/plugins-workspace/commit/387c2f9e0ce4c75c07ffa3fd76391a25b58f5daf)([#802](https://github.com/tauri-apps/plugins-workspace/pull/802)) Update to @tauri-apps/api v2.0.0-alpha.12.

## \[2.0.0-alpha.3]

- [`e438e0a`](https://github.com/tauri-apps/plugins-workspace/commit/e438e0a62d4b430a5159f05f13ecd397dd891a0d)([#676](https://github.com/tauri-apps/plugins-workspace/pull/676)) Update to @tauri-apps/api v2.0.0-alpha.11.

## \[2.0.0-alpha.2]

- [`5c13736`](https://github.com/tauri-apps/plugins-workspace/commit/5c137365c60790e8d4037d449e8237aa3fffdab0)([#673](https://github.com/tauri-apps/plugins-workspace/pull/673)) Update to @tauri-apps/api v2.0.0-alpha.9.
- [`beb6b13`](https://github.com/tauri-apps/plugins-workspace/commit/beb6b139eb669dc0346b3de919aed024f649b9d2)([#675](https://github.com/tauri-apps/plugins-workspace/pull/675)) Fix usage of no longer available `__TAURI_METADATA__` API.

## \[2.0.0-alpha.2]

- [`4e2cef9`](https://github.com/tauri-apps/plugins-workspace/commit/4e2cef9b702bbbb9cf4ee17de50791cb21f1b2a4)([#593](https://github.com/tauri-apps/plugins-workspace/pull/593)) Update to alpha.12.

## \[2.0.0-alpha.1]

- [`d74fc0a`](https://github.com/tauri-apps/plugins-workspace/commit/d74fc0a097996e90a37be8f57d50b7d1f6ca616f)([#555](https://github.com/tauri-apps/plugins-workspace/pull/555)) Update to alpha.11.
- [`84b3612`](https://github.com/tauri-apps/plugins-workspace/commit/84b3612393e3d0d4faeebe1e61cb7d7973556503)([#436](https://github.com/tauri-apps/plugins-workspace/pull/436)) Correctly propagate the promise inside `saveWindowState`, `restoreState` and `restoreStateCurrent` so callers can choose to `await` them.

## \[2.0.0-alpha.0]

- [`717ae67`](https://github.com/tauri-apps/plugins-workspace/commit/717ae670978feb4492fac1f295998b93f2b9347f)([#371](https://github.com/tauri-apps/plugins-workspace/pull/371)) First v2 alpha release!

## \[0.1.1]

- Address a couple of issues with restoring positions:

- Fix restoring window positions correctly when the top-left corner of the window was outside of the monitor.

- Fix restore maximization state only maximized on main monitor.
