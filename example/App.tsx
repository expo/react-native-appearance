import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import Appearance, { AppearanceProvider, useColorScheme } from '..';

import { NativeModules } from 'react-native';

function ping() {
  let abc = Appearance.get('colorScheme');
  alert(abc);
}

export default () => {
  let colorScheme = useColorScheme();

  return (
    <AppearanceProvider>
      <View style={styles.container}>
        <Button title="Ping" onPress={ping} />
        <Text>{colorScheme}</Text>
      </View>
    </AppearanceProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
