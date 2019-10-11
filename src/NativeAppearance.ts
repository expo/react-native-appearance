import { NativeModules, requireNativeComponent } from 'react-native';

// Native modules
export const NativeAppearance = NativeModules.RNCAppearance;
export const NativeAppearanceProvider = requireNativeComponent('RNCAppearanceProvider');
