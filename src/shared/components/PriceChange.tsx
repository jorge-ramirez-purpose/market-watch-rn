import React from 'react';
import { Text } from 'react-native';
import { COLORS } from '@/shared/constants';
import { styles } from './PriceChange.styles';

type TPriceChangeProps = {
  value: number | null;
  fontSize?: number;
};

export const PriceChange = ({ value, fontSize = 14 }: TPriceChangeProps) => {
  if (value === null) {
    return <Text style={[styles.text, { fontSize }]}>—</Text>;
  }

  const isPositive = value >= 0;
  const color = isPositive ? COLORS.positive : COLORS.negative;
  const prefix = isPositive ? '+' : '';

  return (
    <Text style={[styles.text, { color, fontSize }]}>
      {prefix}{value.toFixed(2)}%
    </Text>
  );
};