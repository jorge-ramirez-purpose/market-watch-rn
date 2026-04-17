import React from 'react';
import { View, Text } from 'react-native';
import { PriceChange } from '@/shared/components/PriceChange';
import { styles } from './StatRow.styles';

type StatRowProps = {
  label: string;
  value: string | null;
  changeValue?: number | null;
};

export const StatRow = ({ label, value, changeValue }: StatRowProps) => {
  return (
    <View style={styles.statRow}>
      <Text style={styles.statLabel}>{label}</Text>
      {value ? (
        <Text style={styles.statValue}>{value}</Text>
      ) : (
        <PriceChange value={changeValue ?? null} />
      )}
    </View>
  );
};
