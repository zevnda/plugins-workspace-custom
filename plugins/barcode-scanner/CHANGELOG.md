# Changelog

## \[2.4.0]

- [`aa9140e1`](https://github.com/tauri-apps/plugins-workspace/commit/aa9140e1ac239ab9f015f92b2ed52bbf0eda7c12) ([#2437](https://github.com/tauri-apps/plugins-workspace/pull/2437) by [@enkhjile](https://github.com/tauri-apps/plugins-workspace/../../enkhjile)) Added support for GS1 DataBar on iOS 15.4+

## \[2.3.0]

- [`f209b2f2`](https://github.com/tauri-apps/plugins-workspace/commit/f209b2f23cb29133c97ad5961fb46ef794dbe063) ([#2804](https://github.com/tauri-apps/plugins-workspace/pull/2804) by [@renovate](https://github.com/tauri-apps/plugins-workspace/../../renovate)) Updated tauri to 2.6

## \[2.2.1]

- [`f634e524`](https://github.com/tauri-apps/plugins-workspace/commit/f634e5248ebe428f8305a59f74c13fc15147fb8e) This is an "empty" release to update the plugins' source files on crates.io and docs.rs. This should fix docs.rs build failures for projects using tauri plugins as dependencies.

## \[2.2.0]

- [`3a79266b`](https://github.com/tauri-apps/plugins-workspace/commit/3a79266b8cf96a55b1ae6339d725567d45a44b1d) ([#2173](https://github.com/tauri-apps/plugins-workspace/pull/2173) by [@FabianLars](https://github.com/tauri-apps/plugins-workspace/../../FabianLars)) Bumped all plugins to `v2.2.0`. From now, the versions for the Rust and JavaScript packages of each plugin will be in sync with each other.

## \[2.0.1]

- [`a1a82208`](https://github.com/tauri-apps/plugins-workspace/commit/a1a82208ed4ab87f83310be0dc95428aec9ab241) ([#1873](https://github.com/tauri-apps/plugins-workspace/pull/1873) by [@lucasfernog](https://github.com/tauri-apps/plugins-workspace/../../lucasfernog)) Downgrade MSRV to 1.77.2 to support Windows 7.

## \[2.0.0]

- [`e2c4dfb6`](https://github.com/tauri-apps/plugins-workspace/commit/e2c4dfb6af43e5dd8d9ceba232c315f5febd55c1) Update to tauri v2 stable release.

## \[2.0.0-rc.2]

- [`79d6e19c`](https://github.com/tauri-apps/plugins-workspace/commit/79d6e19c4b38bae0cab29eb88df379e2237d9aac) ([#1777](https://github.com/tauri-apps/plugins-workspace/pull/1777)) Fixed an issue which caused checkPermission and requestPermission to be mixed up.

## \[2.0.0-rc.4]

- [`713c54ef`](https://github.com/tauri-apps/plugins-workspace/commit/713c54ef8365d36afd84585dcabed2fbb751223d) ([#1749](https://github.com/tauri-apps/plugins-workspace/pull/1749) by [@olivierlemasle](https://github.com/tauri-apps/plugins-workspace/../../olivierlemasle)) Remove unused Android dependencies.
- [`8c3a6a25`](https://github.com/tauri-apps/plugins-workspace/commit/8c3a6a253d7029d370659d2102f91a458745d345) ([#1758](https://github.com/tauri-apps/plugins-workspace/pull/1758) by [@lucasfernog](https://github.com/tauri-apps/plugins-workspace/../../lucasfernog)) Validate missing `NSCameraUsageDescription` Info.plist value.

## \[2.0.0-rc.1]

- [`e2e97db5`](https://github.com/tauri-apps/plugins-workspace/commit/e2e97db51983267f5be84d4f6f0278d58834d1f5) ([#1701](https://github.com/tauri-apps/plugins-workspace/pull/1701) by [@lucasfernog](https://github.com/tauri-apps/plugins-workspace/../../lucasfernog)) Use `PermissionState` from the `tauri` crate, which now also includes a "prompt with rationale" variant for Android (returned when your app must explain to the user why it needs the permission).
- [`e2e97db5`](https://github.com/tauri-apps/plugins-workspace/commit/e2e97db51983267f5be84d4f6f0278d58834d1f5) ([#1701](https://github.com/tauri-apps/plugins-workspace/pull/1701) by [@lucasfernog](https://github.com/tauri-apps/plugins-workspace/../../lucasfernog)) Update to tauri 2.0.0-rc.8

## \[2.0.0-rc.2]

- [`b9147758`](https://github.com/tauri-apps/plugins-workspace/commit/b914775898c2bee7ceb20bd17ee595005cd17a64) ([#1679](https://github.com/tauri-apps/plugins-workspace/pull/1679) by [@lucasfernog](https://github.com/tauri-apps/plugins-workspace/../../lucasfernog)) Explicitly set a minimum macOS version for the Swift package.

## \[2.0.0-rc.1]

- [`2c00c029`](https://github.com/tauri-apps/plugins-workspace/commit/2c00c0292c9127b81567de46691e8c0f73557261) ([#1630](https://github.com/tauri-apps/plugins-workspace/pull/1630) by [@FabianLars](https://github.com/tauri-apps/plugins-workspace/../../FabianLars)) Fixed an issue that caused multi-word IIFE names to not be formatted correctly. For example the `barcode-scanner` was defined as `window.__TAURI_PLUGIN_CLIPBOARDMANAGER__` instead of `window.__TAURI_PLUGIN_CLIPBOARD_MANAGER__`.

### changes

- [`6b079cfd`](https://github.com/tauri-apps/plugins-workspace/commit/6b079cfdd107c94abc2c7300f6af00bac3ff4040) ([#1649](https://github.com/tauri-apps/plugins-workspace/pull/1649) by [@ahqsoftwares](https://github.com/tauri-apps/plugins-workspace/../../ahqsoftwares)) Remove targetSdk from build.kts files as it is deprecated and will be removed from DSL v9.0

## \[2.0.0-rc.0]

- [`9887d1`](https://github.com/tauri-apps/plugins-workspace/commit/9887d14bd0e971c4c0f5c1188fc4005d3fc2e29e) Update to tauri RC.

## \[2.0.0-beta.8]

- [`99d6ac0f`](https://github.com/tauri-apps/plugins-workspace/commit/99d6ac0f9506a6a4a1aa59c728157190a7441af6) ([#1606](https://github.com/tauri-apps/plugins-workspace/pull/1606) by [@FabianLars](https://github.com/tauri-apps/plugins-workspace/../../FabianLars)) The JS packages now specify the *minimum* `@tauri-apps/api` version instead of a single exact version.
- [`6de87966`](https://github.com/tauri-apps/plugins-workspace/commit/6de87966ecc00ad9d91c25be452f1f46bd2b7e1f) ([#1597](https://github.com/tauri-apps/plugins-workspace/pull/1597) by [@Legend-Master](https://github.com/tauri-apps/plugins-workspace/../../Legend-Master)) Update to tauri beta.25.

## \[2.0.0-beta.7]

- [`22a17980`](https://github.com/tauri-apps/plugins-workspace/commit/22a17980ff4f6f8c40adb1b8f4ffc6dae2fe7e30) ([#1537](https://github.com/tauri-apps/plugins-workspace/pull/1537) by [@lucasfernog](https://github.com/tauri-apps/plugins-workspace/../../lucasfernog)) Update to tauri beta.24.

## \[2.0.0-beta.6]

- [`76daee7a`](https://github.com/tauri-apps/plugins-workspace/commit/76daee7aafece34de3092c86e531cf9eb1138989) ([#1512](https://github.com/tauri-apps/plugins-workspace/pull/1512) by [@renovate](https://github.com/tauri-apps/plugins-workspace/../../renovate)) Update to tauri beta.23.

## \[2.0.0-beta.5]

- [`9013854f`](https://github.com/tauri-apps/plugins-workspace/commit/9013854f42a49a230b9dbb9d02774765528a923f)([#1382](https://github.com/tauri-apps/plugins-workspace/pull/1382)) Update to tauri beta.22.

## \[2.0.0-beta.4]

- [`430bd6f4`](https://github.com/tauri-apps/plugins-workspace/commit/430bd6f4f379bee5d232ae6b098ae131db7f178a)([#1363](https://github.com/tauri-apps/plugins-workspace/pull/1363)) Update to tauri beta.20.

## \[2.0.0-beta.3]

- [`bd1ed590`](https://github.com/tauri-apps/plugins-workspace/commit/bd1ed5903ffcce5500310dac1e59e8c67674ef1e)([#1237](https://github.com/tauri-apps/plugins-workspace/pull/1237)) Update to tauri beta.17.

## \[2.0.0-beta.4]

- [`326df688`](https://github.com/tauri-apps/plugins-workspace/commit/326df6883998d416fc0837583ed972854628bb52)([#1236](https://github.com/tauri-apps/plugins-workspace/pull/1236)) Fixes command argument parsing on iOS.

## \[2.0.0-beta.3]

- [`a04ea2f`](https://github.com/tauri-apps/plugins-workspace/commit/a04ea2f38294d5a3987578283badc8eec87a7752)([#1071](https://github.com/tauri-apps/plugins-workspace/pull/1071)) The global API script is now only added to the binary when the `withGlobalTauri` config is true.

## \[2.0.0-beta.2]

- [`99bea25`](https://github.com/tauri-apps/plugins-workspace/commit/99bea2559c2c0648c2519c50a18cd124dacef57b)([#1005](https://github.com/tauri-apps/plugins-workspace/pull/1005)) Update to tauri beta.8.

## \[2.0.0-beta.1]

- [`569defb`](https://github.com/tauri-apps/plugins-workspace/commit/569defbe9492e38938554bb7bdc1be9151456d21) Update to tauri beta.4.

## \[2.0.0-beta.0]

- [`d198c01`](https://github.com/tauri-apps/plugins-workspace/commit/d198c014863ee260cb0de88a14b7fc4356ef7474)([#862](https://github.com/tauri-apps/plugins-workspace/pull/862)) Update to tauri beta.
- [`d198c01`](https://github.com/tauri-apps/plugins-workspace/commit/d198c014863ee260cb0de88a14b7fc4356ef7474)([#862](https://github.com/tauri-apps/plugins-workspace/pull/862)) Add permissions.

## \[2.0.0-alpha.4]

- [`387c2f9`](https://github.com/tauri-apps/plugins-workspace/commit/387c2f9e0ce4c75c07ffa3fd76391a25b58f5daf)([#802](https://github.com/tauri-apps/plugins-workspace/pull/802)) Update to @tauri-apps/api v2.0.0-alpha.13.

## \[2.0.0-alpha.3]

- [`387c2f9`](https://github.com/tauri-apps/plugins-workspace/commit/387c2f9e0ce4c75c07ffa3fd76391a25b58f5daf)([#802](https://github.com/tauri-apps/plugins-workspace/pull/802)) Update to @tauri-apps/api v2.0.0-alpha.12.

## \[2.0.0-alpha.2]

- [`e438e0a`](https://github.com/tauri-apps/plugins-workspace/commit/e438e0a62d4b430a5159f05f13ecd397dd891a0d)([#676](https://github.com/tauri-apps/plugins-workspace/pull/676)) Update to @tauri-apps/api v2.0.0-alpha.11.

## \[2.0.0-alpha.1]

- [`5c13736`](https://github.com/tauri-apps/plugins-workspace/commit/5c137365c60790e8d4037d449e8237aa3fffdab0)([#673](https://github.com/tauri-apps/plugins-workspace/pull/673)) Update to @tauri-apps/api v2.0.0-alpha.9.

## \[2.0.0-alpha.0]

- [`454428c`](https://github.com/tauri-apps/plugins-workspace/commit/454428cd50ce4962f0bad8e355aebc68af8cc61f)([#536](https://github.com/tauri-apps/plugins-workspace/pull/536)) Initial release.
  commit/454428cd50ce4962f0bad8e355aebc68af8cc61f)([#536](https://github.com/tauri-apps/plugins-workspace/pull/536)) Initial release.
  36]\(https://github.com/tauri-apps/plugins-workspace/pull/536)) Initial release.
  commit/454428cd50ce4962f0bad8e355aebc68af8cc61f)([#536](https://github.com/tauri-apps/plugins-workspace/pull/536)) Initial release.
  .
  commit/454428cd50ce4962f0bad8e355aebc68af8cc61f)([#536](https://github.com/tauri-apps/plugins-workspace/pull/536)) Initial release.
  github.com/tauri-apps/plugins-workspace/pull/536)) Initial release.
