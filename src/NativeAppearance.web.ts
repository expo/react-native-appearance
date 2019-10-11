import { ColorSchemeName, AppearancePreferences } from './Appearance.types';

// @ts-ignore
import SyntheticPlatformEmitter from './web/SyntheticPlatformEmitter';

const query = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

function isMediaQueryList(query: any): query is MediaQueryList {
  return query && query.addListener && query.removeListener && typeof query.matches === 'boolean';
}

let colorScheme: ColorSchemeName = 'no-preference';

if (isMediaQueryList(query)) {
  colorScheme = query.matches ? 'dark' : 'light';
  query.addListener(function({ matches }) {
    const colorScheme = matches ? 'dark' : 'light';
    SyntheticPlatformEmitter.emit('appearanceChanged', {
      colorScheme,
    });
  });
}

export const NativeAppearance = {
  get name(): string {
    return 'NativeAppearance';
  },
  get initialPreferences(): AppearancePreferences {
    return { colorScheme };
  },
};

export const NativeAppearanceProvider = ({ children }: any) => children;
