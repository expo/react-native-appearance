import * as React from 'react';
import { View } from 'react-native';

let Appearance = require('react-native').Appearance;
let AppearanceProvider = (props: any) => <View style={{ flex: 1 }} {...props} />;
let useColorScheme = require('react-native').useColorScheme;

if (!Appearance) {
  let polyfill = require('./polyfill');
  Appearance = polyfill.Appearance;
  AppearanceProvider = polyfill.AppearanceProvider;
  useColorScheme = polyfill.useColorScheme;
}

import { ColorSchemeName, AppearanceListener, AppearancePreferences } from './Appearance.types';

export {
  Appearance,
  AppearanceProvider,
  useColorScheme,
  ColorSchemeName,
  AppearanceListener,
  AppearancePreferences,
};
