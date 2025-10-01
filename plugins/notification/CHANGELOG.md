# Changelog

## \[2.3.1]

- [`8abb31ee`](https://github.com/tauri-apps/plugins-workspace/commit/8abb31ee59c68197102c0aa699d690b34646ec3c) ([#2905](https://github.com/tauri-apps/plugins-workspace/pull/2905) by [@ChristianPavilonis](https://github.com/tauri-apps/plugins-workspace/../../ChristianPavilonis)) Fix notification scheduling on iOS.
- [`2d03e2ea`](https://github.com/tauri-apps/plugins-workspace/commit/2d03e2eac2c19ad997d81d23836ab6a219252ffb) ([#2678](https://github.com/tauri-apps/plugins-workspace/pull/2678) by [@Keerthi421](https://github.com/tauri-apps/plugins-workspace/../../Keerthi421)) Added sound support for desktop notifications which was previously only available on mobile platforms.

## \[2.3.0]

- [`f209b2f2`](https://github.com/tauri-apps/plugins-workspace/commit/f209b2f23cb29133c97ad5961fb46ef794dbe063) ([#2804](https://github.com/tauri-apps/plugins-workspace/pull/2804) by [@renovate](https://github.com/tauri-apps/plugins-workspace/../../renovate)) Updated tauri to 2.6

## \[2.2.3]

- [`f634e524`](https://github.com/tauri-apps/plugins-workspace/commit/f634e5248ebe428f8305a59f74c13fc15147fb8e) This is an "empty" release to update the plugins' source files on crates.io and docs.rs. This should fix docs.rs build failures for projects using tauri plugins as dependencies.

## \[2.2.2]

- [`a1b3fa27`](https://github.com/tauri-apps/plugins-workspace/commit/a1b3fa27f11022c9b6622b4fab12d93239eb05de) ([#2515](https://github.com/tauri-apps/plugins-workspace/pull/2515) by [@FabianLars](https://github.com/tauri-apps/plugins-workspace/../../FabianLars)) Re-exported the `Geolocation`, `Haptics`, `Notification`, and `Os` structs so that they show up on docs.rs.

## \[2.2.1]

- [`da5c59e2`](https://github.com/tauri-apps/plugins-workspace/commit/da5c59e2fe879d177e3cfd52fcacce85440423cb) ([#2271](https://github.com/tauri-apps/plugins-workspace/pull/2271) by [@renovate](https://github.com/tauri-apps/plugins-workspace/../../renovate)) Updated `zbus` dependency to version 5. No API changes.

## \[2.2.0]

- [`3a79266b`](https://github.com/tauri-apps/plugins-workspace/commit/3a79266b8cf96a55b1ae6339d725567d45a44b1d) ([#2173](https://github.com/tauri-apps/plugins-workspace/pull/2173) by [@FabianLars](https://github.com/tauri-apps/plugins-workspace/../../FabianLars)) Bumped all plugins to `v2.2.0`. From now, the versions for the Rust and JavaScript packages of each plugin will be in sync with each other.

## \[2.0.1]

- [`a1a82208`](https://github.com/tauri-apps/plugins-workspace/commit/a1a82208ed4ab87f83310be0dc95428aec9ab241) ([#1873](https://github.com/tauri-apps/plugins-workspace/pull/1873) by [@lucasfernog](https://github.com/tauri-apps/plugins-workspace/../../lucasfernog)) Downgrade MSRV to 1.77.2 to support Windows 7.

## \[2.0.0]

- [`e2c4dfb6`](https://github.com/tauri-apps/plugins-workspace/commit/e2c4dfb6af43e5dd8d9ceba232c315f5febd55c1) Update to tauri v2 stable release.

## \[2.0.0-rc.5]

- [`fb85e5dd`](https://github.com/tauri-apps/plugins-workspace/commit/fb85e5dd76688f3ae836890160f9bde843b70167) ([#1785](https://github.com/tauri-apps/plugins-workspace/pull/1785)) Update to tauri 2.0.0-rc.12.

## \[2.0.0-rc.4]

- [`3d301c65`](https://github.com/tauri-apps/plugins-workspace/commit/3d301c654e6f5e7f343e0e0cbb57648002e98f04) ([#1737](https://github.com/tauri-apps/plugins-workspace/pull/1737) by [@lucasfernog](https://github.com/tauri-apps/plugins-workspace/../../lucasfernog)) The notification body is now optional on iOS to match the other platforms.

## \[2.0.0-rc.1]

- [`e2e97db5`](https://github.com/tauri-apps/plugins-workspace/commit/e2e97db51983267f5be84d4f6f0278d58834d1f5) ([#1701](https://github.com/tauri-apps/plugins-workspace/pull/1701) by [@lucasfernog](https://github.com/tauri-apps/plugins-workspace/../../lucasfernog)) Use `PermissionState` from the `tauri` crate, which now also includes a "prompt with rationale" variant for Android (returned when your app must explain to the user why it needs the permission).
- [`e2e97db5`](https://github.com/tauri-apps/plugins-workspace/commit/e2e97db51983267f5be84d4f6f0278d58834d1f5) ([#1701](https://github.com/tauri-apps/plugins-workspace/pull/1701) by [@lucasfernog](https://github.com/tauri-apps/plugins-workspace/../../lucasfernog)) **Breaking change**: The permission type when using the API is now `'granted' | 'denied' | 'prompt' | 'prompt-with-rationale'` instead of `'granted' | 'denied' | 'default'` for consistency with Rust types. When using the `window.Notification` API the type is unchanged to match the Web API type.
- [`e2e97db5`](https://github.com/tauri-apps/plugins-workspace/commit/e2e97db51983267f5be84d4f6f0278d58834d1f5) ([#1701](https://github.com/tauri-apps/plugins-workspace/pull/1701) by [@lucasfernog](https://github.com/tauri-apps/plugins-workspace/../../lucasfernog)) Update to tauri 2.0.0-rc.8

## \[2.0.0-rc.2]

- [`b9147758`](https://github.com/tauri-apps/plugins-workspace/commit/b914775898c2bee7ceb20bd17ee595005cd17a64) ([#1679](https://github.com/tauri-apps/plugins-workspace/pull/1679) by [@lucasfernog](https://github.com/tauri-apps/plugins-workspace/../../lucasfernog)) Explicitly set a minimum macOS version for the Swift package.

## \[2.0.0-rc.1]

### changes

- [`6b079cfd`](https://github.com/tauri-apps/plugins-workspace/commit/6b079cfdd107c94abc2c7300f6af00bac3ff4040) ([#1649](https://github.com/tauri-apps/plugins-workspace/pull/1649) by [@ahqsoftwares](https://github.com/tauri-apps/plugins-workspace/../../ahqsoftwares)) Remove targetSdk from build.kts files as it is deprecated and will be removed from DSL v9.0

## \[2.0.0-rc.0]

- [`9887d1`](https://github.com/tauri-apps/plugins-workspace/commit/9887d14bd0e971c4c0f5c1188fc4005d3fc2e29e) Update to tauri RC.

## \[2.0.0-beta.8]

- [`99d6ac0f`](https://github.com/tauri-apps/plugins-workspace/commit/99d6ac0f9506a6a4a1aa59c728157190a7441af6) ([#1606](https://github.com/tauri-apps/plugins-workspace/pull/1606) by [@FabianLars](https://github.com/tauri-apps/plugins-workspace/../../FabianLars)) The JS packages now specify the *minimum* `@tauri-apps/api` version instead of a single exact version.
- [`6de87966`](https://github.com/tauri-apps/plugins-workspace/commit/6de87966ecc00ad9d91c25be452f1f46bd2b7e1f) ([#1597](https://github.com/tauri-apps/plugins-workspace/pull/1597) by [@Legend-Master](https://github.com/tauri-apps/plugins-workspace/../../Legend-Master)) Update to tauri beta.25.

## \[2.0.0-beta.11]

- [`725ff429`](https://github.com/tauri-apps/plugins-workspace/commit/725ff4295e56df9c30c099813bd64b96fe61b945) ([#1556](https://github.com/tauri-apps/plugins-workspace/pull/1556) by [@FabianLars](https://github.com/tauri-apps/plugins-workspace/../../FabianLars)) Fixed an issue that caused the `notification` plugin's initialization script to cause the WebView on Windows to throw a `STATUS_ACCESS_VIOLATION` error on remote websites.

## \[2.0.0-beta.7]

- [`22a17980`](https://github.com/tauri-apps/plugins-workspace/commit/22a17980ff4f6f8c40adb1b8f4ffc6dae2fe7e30) ([#1537](https://github.com/tauri-apps/plugins-workspace/pull/1537) by [@lucasfernog](https://github.com/tauri-apps/plugins-workspace/../../lucasfernog)) Update to tauri beta.24.

## \[2.0.0-beta.6]

- [`76daee7a`](https://github.com/tauri-apps/plugins-workspace/commit/76daee7aafece34de3092c86e531cf9eb1138989) ([#1512](https://github.com/tauri-apps/plugins-workspace/pull/1512) by [@renovate](https://github.com/tauri-apps/plugins-workspace/../../renovate)) Update to tauri beta.23.

## \[2.0.0-beta.8]

- [`3779fb50`](https://github.com/tauri-apps/plugins-workspace/commit/3779fb50634fba4d7e7eb0bfecc2216349b9d64d) ([#1432](https://github.com/tauri-apps/plugins-workspace/pull/1432) by [@lucasfernog](https://github.com/tauri-apps/plugins-workspace/../../lucasfernog)) Use notify_rust from crates.io instead of local fork.

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
- [`62ce5df`](https://github.com/tauri-apps/plugins-workspace/commit/62ce5df52ca3c86786e711ef193a206e7b0dc0cf)([#1096](https://github.com/tauri-apps/plugins-workspace/pull/1096)) Fix development mode check to set the app ID on macOS.

## \[2.0.0-beta.2]

- [`99bea25`](https://github.com/tauri-apps/plugins-workspace/commit/99bea2559c2c0648c2519c50a18cd124dacef57b)([#1005](https://github.com/tauri-apps/plugins-workspace/pull/1005)) Update to tauri beta.8.

## \[2.0.0-beta.1]

- [`569defb`](https://github.com/tauri-apps/plugins-workspace/commit/569defbe9492e38938554bb7bdc1be9151456d21) Update to tauri beta.4.

## \[2.0.0-beta.0]

- [`d198c01`](https://github.com/tauri-apps/plugins-workspace/commit/d198c014863ee260cb0de88a14b7fc4356ef7474)([#862](https://github.com/tauri-apps/plugins-workspace/pull/862)) Update to tauri beta.
- [`1b1d795`](https://github.com/tauri-apps/plugins-workspace/commit/1b1d795b5866e5524a9a9925f0fb7b2f8e3e3675)([#874](https://github.com/tauri-apps/plugins-workspace/pull/874)) Export the missing `Schedule` class.
- [`8dea78a`](https://github.com/tauri-apps/plugins-workspace/commit/8dea78ac7dcb502159e66bad464094696aa257d4)([#909](https://github.com/tauri-apps/plugins-workspace/pull/909)) Fixes deserialization and implementation bugs with scheduled notifications on Android.

## \[2.0.0-alpha.5]

- [`387c2f9`](https://github.com/tauri-apps/plugins-workspace/commit/387c2f9e0ce4c75c07ffa3fd76391a25b58f5daf)([#802](https://github.com/tauri-apps/plugins-workspace/pull/802)) Update to @tauri-apps/api v2.0.0-alpha.13.

## \[2.0.0-alpha.4]

- [`387c2f9`](https://github.com/tauri-apps/plugins-workspace/commit/387c2f9e0ce4c75c07ffa3fd76391a25b58f5daf)([#802](https://github.com/tauri-apps/plugins-workspace/pull/802)) Update to @tauri-apps/api v2.0.0-alpha.12.

## \[2.0.0-alpha.3]

- [`e438e0a`](https://github.com/tauri-apps/plugins-workspace/commit/e438e0a62d4b430a5159f05f13ecd397dd891a0d)([#676](https://github.com/tauri-apps/plugins-workspace/pull/676)) Update to @tauri-apps/api v2.0.0-alpha.11.

## \[2.0.0-alpha.2]

- [`5c13736`](https://github.com/tauri-apps/plugins-workspace/commit/5c137365c60790e8d4037d449e8237aa3fffdab0)([#673](https://github.com/tauri-apps/plugins-workspace/pull/673)) Update to @tauri-apps/api v2.0.0-alpha.9.

## \[2.0.0-alpha.3]

- [`4e2cef9`](https://github.com/tauri-apps/plugins-workspace/commit/4e2cef9b702bbbb9cf4ee17de50791cb21f1b2a4)([#593](https://github.com/tauri-apps/plugins-workspace/pull/593)) Update to alpha.12.

## \[2.0.0-alpha.1]

- [`d74fc0a`](https://github.com/tauri-apps/plugins-workspace/commit/d74fc0a097996e90a37be8f57d50b7d1f6ca616f)([#555](https://github.com/tauri-apps/plugins-workspace/pull/555)) Update to alpha.11.

## \[2.0.0-alpha.1]

- [`d8b4aca`](https://github.com/tauri-apps/plugins-workspace/commit/d8b4aca69f628b170804ecb982e2c319d026ef47)([#414](https://github.com/tauri-apps/plugins-workspace/pull/414)) Use `window.__TAURI_INVOKE__` instead of `window.__TAURI__` in init.js, fixes usage in apps without `withGlobalTauri` enabled.
- [`7d71ad4`](https://github.com/tauri-apps/plugins-workspace/commit/7d71ad4e587bcf47ea34645f5b226945e487b765) Play a default sound when showing a notification on Windows.

## \[2.0.0-alpha.0]

- [`717ae67`](https://github.com/tauri-apps/plugins-workspace/commit/717ae670978feb4492fac1f295998b93f2b9347f)([#371](https://github.com/tauri-apps/plugins-workspace/pull/371)) First v2 alpha release!
