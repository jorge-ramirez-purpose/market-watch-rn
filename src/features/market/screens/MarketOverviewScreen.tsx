import React from 'react';
import { View, Text } from 'react-native';
import type { MarketOverviewScreenProps } from '@/shared/types/navigation';
import { styles } from './MarketOverviewScreen.styles';

export const MarketOverviewScreen = ({ navigation }: MarketOverviewScreenProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Market Overview</Text>
    </View>
  );
};