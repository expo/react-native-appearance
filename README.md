# react-native-appearance

Polyfill for `Appearance` API to detect preferred color scheme (light/dark) in React Native 0.59, 0.60 and perhaps more (ymmv outside of these two!). The `Appearance` API will likely be available in `react-native@>=0.61`.

This library is currently iOS only, and on iOS < 13 the color scheme will always be `'no-preference'`.

## Getting started

Install the library using either Yarn:

```
yarn add react-native-appearance
```

or npm:

```
npm install --save react-native-appearance
```

You then need to link the native parts of the library for the platforms you are using. The easiest way to link the library is using the CLI tool by running this command from the root of your project:

```
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

## Usage

First, you need to wrap your app in the `AppearanceProvider`. At the root of your app, do the following:

```js
import { AppearanceProvider} from 'react-native-appearance';

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
Appearance.get('colorScheme');

/**
 * Subscribe to color scheme changes with a hook
 */
function MyComponent() {
  let colorScheme = useColorScheme();
  if (colorScheme === 'dark') {
    // render some dark thing
  } else {
    // render some light thing
  }
}

/**
 * Subscribe to color scheme without a hook
 */
let subscription = Appearance.addChangeListener(({ colorScheme }) => {
  // do something with color scheme
});

// Remove the subscription at some point
subscription.remove()
```
