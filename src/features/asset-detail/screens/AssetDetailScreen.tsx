import React from 'react';
import { View, Text } from 'react-native';
import type { AssetDetailScreenProps } from '@/shared/types/navigation';
import { styles } from './AssetDetailScreen.styles';

export const AssetDetailScreen = ({ route }: AssetDetailScreenProps) => {
  const { coinId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Asset Detail: {coinId}</Text>
    </View>
  );
};
