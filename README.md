# react-native-appearance

Polyfill for `Appearance` API to detect preferred color scheme (light/dark) in React Native 0.59, 0.60 and perhaps more (ymmv outside of these two!). The `Appearance` API will likely be available in `react-native@>=0.61`.

This stable verison of this library is currently iOS only, and on iOS < 13 the color scheme will always be `'no-preference'`.

**Android and web support are only available on 0.2.0-rc.0, you will need to install this verison explicitly if you would like to try them out!**

## Installation

Installation instructions vary depending on whether you're using a managed Expo project or a bare React Native project.

### Managed Expo project

This library is supported in Expo SDK 35+.

```sh
expo install react-native-appearance
```

### Bare React Native project

```sh
yarn add react-native-appearance
```

## Linking

After installing the package you need to link the native parts of the library for the platforms you are using. The easiest way to link the library is using the CLI tool by running this command from the root of your project:

```sh
react-native link react-native-appearance
```

If you can't or don't want to use the CLI tool, you can also manually link the library using the instructions below (click on the arrow to show them):

<details>
<summary>Manually link the library on iOS</summary>

Either follow the [instructions in the React Native documentation](https://facebook.github.io/react-native/docs/linking-libraries-ios#manual-linking) to manually link the framework or link using [Cocoapods](https://cocoapods.org) by adding this to your `Podfile`:

```ruby
pod 'react-native-appearance', :path => '../node_modules/react-native-appearance'
```

</details>

<details>
<summary>Manually link the library on Android</summary>

1. Open up `android/app/src/main/java/[...]/MainApplication.java`

- Add `import com.reactlibrary.RNCApperancePackage;` to the imports at the top of the file
- Add `new RNCApperancePackage()` to the list returned by the `getPackages()` method

2. Append the following lines to `android/settings.gradle`:

```
include ':react-native-appearance'
project(':react-native-appearance').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-appearance/android')

```

3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:

```
implementation project(':react-native-appearance')
```

</details>

## Configuration

<details>
<summary>iOS configuration</summary>

In Expo managed projects, add `ios.userInterfaceStyle` to your `app.json`:

```json
{
  "expo": {
    "ios": {
      "userInterfaceStyle": "automatic"
    }
  }
}
```

In bare React Native apps, you can configure supported styles with the [UIUserInterfaceStyle](https://developer.apple.com/documentation/bundleresources/information_property_list/uiuserinterfacestyle) key in your app `Info.plist`.

</details>

<details>
<summary>Android configuration</summary>

Add the `uiMode` flag in `AndroidManifest.xml`:

```xml
<activity
...
android:configChanges="keyboard|keyboardHidden|orientation|screenSize|uiMode">
```

Implement the `onConfigurationChanged` method in `MainActivity.java`:

```java
import android.content.Intent; // <--- import
import android.content.res.Configuration; // <--- import

public class MainActivity extends ReactActivity {
  ......

  // copy these lines
  @Override
  public void onConfigurationChanged(Configuration newConfig) {
    super.onConfigurationChanged(newConfig);
    Intent intent = new Intent("onConfigurationChanged");
    intent.putExtra("newConfig", newConfig);
    sendBroadcast(intent);
  }

  ......
}
```

</details>

## Usage

First, you need to wrap your app in the `AppearanceProvider`. At the root of your app, do the following:

```js
import { AppearanceProvider } from 'react-native-appearance';

export default () => (
  <AppearanceProvider>
    <App />
  </AppearanceProvider>
);
```

Now you can use `Appearance` and `useColorScheme` anywhere in your app.

```js
import { Appearance, useColorScheme } from 'react-native-appearance';

/**
 * Get the current color scheme
 */
Appearance.getColorScheme();

/**
 * Subscribe to color scheme changes with a hook
 */
function MyComponent() {
  const colorScheme = useColorScheme();
  if (colorScheme === 'dark') {
    // render some dark thing
  } else {
    // render some light thing
  }
}

/**
 * Subscribe to color scheme without a hook
 */
const subscription = Appearance.addChangeListener(({ colorScheme }) => {
  // do something with color scheme
});

// Remove the subscription at some point
subscription.remove()
```

## Attribution

This was mostly written by Facebook for inclusion in React Native core. It is provided here as a separate module so people can opt-in to using it without updating entirely to the newest React Native version.
