import * as React from 'react';
import NativeAppearance from './NativeAppearance';

export default class Appearance {
  static get() {
    NativeAppearance.ping((value: string) => alert(value))
  }
}