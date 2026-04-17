import React from 'react';
import { View, Text } from 'react-native';
import { PriceChange } from '@/shared/components/PriceChange';
import { formatCurrency } from '@/shared/utils/formatters';
import { styles } from './Price.styles';

type TPriceProps = {
  price: number;
  priceChange24h: number | null;
  currency: string;
};

export const Price = ({
  price,
  priceChange24h,
  currency,
}: TPriceProps) => {
  return (
    <View style={styles.priceSection}>
      <Text style={styles.price}>{formatCurrency(price, currency)}</Text>
      <PriceChange value={priceChange24h} fontSize={18} />
    </View>
  );
};
