import React, { useMemo } from 'react';
import { NativeEventEmitter } from 'react-native';
import { EventEmitter, EventSubscription } from 'fbemitter';
import { useSubscription } from 'use-subscription';
import invariant from 'invariant';

import NativeAppearance from './NativeAppearance';

type ColorSchemeName = 'light' | 'dark' | 'no-preference';

interface AppearancePreferences {
  colorScheme: ColorSchemeName;
}

type AppearanceListener = (preferences: AppearancePreferences) => void;

const eventEmitter = new EventEmitter();

let appearancePreferencesInitialized = false;
let appearancePreferences: AppearancePreferences;

export default class Appearance {
  /**
   * Note: Although appearance is available immediately, it may change (e.g
   * Dark Mode) so any rendering logic or styles that depend on this should try
   * to call this function on every render, rather than caching the value (for
   * example, using inline styles rather than setting a value in a
   * `StyleSheet`).
   *
   * Example: `const colorScheme = Appearance.get('colorScheme');`
   *
   * @param {string} preference Name of preference (e.g. 'colorScheme').
   * @returns {ColorSchemeName} Value for the preference.
   */
  static get<P extends keyof AppearancePreferences>(
    preference: P,
  ): AppearancePreferences[P] {
    invariant(
      appearancePreferences[preference],
      'No preference set for key ' + preference,
    );
    return appearancePreferences[preference];
  }

  /**
   * This should only be called from native code by sending the
   * appearanceChanged event.
   *
   * @param {object} appearancePreferences Simple string-keyed object of
   * appearance preferences to set.
   */
  static set(preferences: AppearancePreferences): void {
    let { colorScheme } = preferences;
    appearancePreferences = { colorScheme };

    if (appearancePreferencesInitialized) {
      // Don't fire 'change' the first time the preferences are set.
      eventEmitter.emit('change', preferences);
    } else {
      appearancePreferencesInitialized = true;
    }
  }

  /**
   * Add an event handler that is fired when appearance preferences change.
   */
  static addChangeListener(listener: AppearanceListener): EventSubscription {
    return eventEmitter.addListener('change', listener);
  }

  /**
   * Unused: some people might expect to remove the listener like this, but they shouldn't.
   */
  static removeChangeListener(_listener: AppearanceListener): void {
    console.error(
      'Call subscription.remove() on the subscription returned from Appearance.addChangeListener to unsubscribe from Appearance change events.',
    );
  }
}

// If the native appearance module is not linked then we just use no-preference
if (NativeAppearance) {
  const nativeEventEmitter = new NativeEventEmitter(NativeAppearance);
  // Subscribe before calling to make sure we don't miss any updates in between.
  nativeEventEmitter.addListener(
    'appearanceChanged',
    (newAppearance: AppearancePreferences) => {
      Appearance.set(newAppearance);
    },
  );
  Appearance.set(NativeAppearance.getPreferences());
} else {
  Appearance.set({ colorScheme: 'no-preference' });
}

import { requireNativeComponent } from 'react-native';
const NativeAppearanceProvider = requireNativeComponent(
  'RNCAppearanceProvider',
);

export const AppearanceProvider = (props: any) => (
  <NativeAppearanceProvider style={{ flex: 1 }} {...props} />
);

export function useColorScheme(): ColorSchemeName {
  const subscription = useMemo(
    () => ({
      getCurrentValue: () => Appearance.get('colorScheme'),
      subscribe: (callback: AppearanceListener) => {
        Appearance.addChangeListener(callback);
        return () => Appearance.removeChangeListener(callback);
      },
    }),
    [],
  );

  return useSubscription<ColorSchemeName>(subscription);
}
