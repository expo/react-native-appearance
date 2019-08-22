import { NativeSyntheticEvent } from 'react-native';

export type AppearanceChangedEvent = NativeSyntheticEvent<{  }>;

export type AppearanceChangeNativeCallback = (event: AppearanceChangedEvent) => void;