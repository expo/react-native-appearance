import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { Appearance, AppearanceProvider, useColorScheme } from '..';

export default () => {
  let colorScheme = useColorScheme();

  return (
    <AppearanceProvider>
      <View
        style={[
          styles.container,
          {
            backgroundColor: colorScheme === 'light' ? '#fff' : '#000',
          },
        ]}
      >
        <Button title="Ping" onPress={() => alert(Appearance.getColorScheme())} />
        <Text style={{ color: colorScheme === 'light' ? '#000' : '#fff' }}>{colorScheme}!!!</Text>
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
