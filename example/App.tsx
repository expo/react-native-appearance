import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { Appearance, AppearanceProvider, useColorScheme } from '..';

export default () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const color = isDark ? '#f1f1f1' : '#333';
  return (
    <AppearanceProvider>
      <View style={[styles.container, { backgroundColor: isDark ? '#333' : '#f1f1f1' }]}>
        <Text style={[styles.text, { color }]}>{colorScheme}</Text>
        <Button title="Get Current Scheme" onPress={() => alert(Appearance.getColorScheme())} />
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
  text: {
    fontSize: 16,
    marginBottom: 24,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
