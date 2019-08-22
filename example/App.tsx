import * as React from 'react';
import { StyleSheet, View, Button } from 'react-native';

import Appearance from '..';

import { NativeModules } from 'react-native';


function ping() {
  Appearance.get();
}

export default () => {
  return (
    <View style={styles.container}>
      <Button title="Ping" onPress={ping} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
