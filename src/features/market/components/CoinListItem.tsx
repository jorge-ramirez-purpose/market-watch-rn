import React, { useCallback, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
} from 'react-native';
import { PriceChange } from '@/shared/components/PriceChange';
import { formatCurrency } from '@/shared/utils/formatters';
import { useTheme } from '@/shared/hooks/useTheme';
import { TCoinMarket } from '@/shared/schemas/coin';
import { createStyles } from './CoinListItem.styles';

type TCoinListItemProps = {
  coin: TCoinMarket;
  currency: string;
  onPress: (coinId: string) => void;
};

export const CoinListItem = React.memo(({
  coin,
  currency,
  onPress,
}: TCoinListItemProps) => {
  const colors = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const handlePress = useCallback(() => {
    onPress(coin.id);
  }, [coin.id, onPress]);
  const upperCaseSymbol = coin.symbol.toUpperCase();

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.leftSection}>
        <Image source={{ uri: coin.image }} style={styles.image} />
        <View style={styles.nameContainer}>
          <Text style={styles.name} numberOfLines={1}>
            {coin.name}
          </Text>
          <Text style={styles.symbol}>
            {upperCaseSymbol}
          </Text>
        </View>
      </View>

      <View style={styles.rightSection}>
        <Text style={styles.price}>
          {formatCurrency(coin.currentPrice, currency)}
        </Text>
        <PriceChange value={coin.priceChangePercentage24h} />
      </View>
    </Pressable>
  );
});
