# react-native-appearance

Polyfill for `Appearance` API which will likely be available in `react-native@>=0.61`. iOS only.

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

