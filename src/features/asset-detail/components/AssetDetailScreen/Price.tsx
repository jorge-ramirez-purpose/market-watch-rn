import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import { PriceChange } from '@/shared/components/PriceChange';
import { formatCurrency } from '@/shared/utils/formatters';
import { useTheme } from '@/shared/hooks/useTheme';
import { createStyles } from './Price.styles';

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
  const colors = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.priceSection}>
      <Text style={styles.price}>{formatCurrency(price, currency)}</Text>
      <PriceChange value={priceChange24h} fontSize={18} />
    </View>
  );
};
