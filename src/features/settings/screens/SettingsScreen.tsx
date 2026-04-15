import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './SettingsScreen.styles';

export const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>
    </View>
  );
};