import React, { useMemo } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useTheme } from '@/shared/hooks/useTheme';
import { createStyles } from './Header.styles';
import { TCoinDetail } from '@/shared/schemas/coin';

type THeaderProps = {
  coin: TCoinDetail;
  isInWatchlist: boolean;
  onWatchlistToggle: () => void;
};

export const Header = ({
  coin,
  isInWatchlist,
  onWatchlistToggle,
}: THeaderProps) => {
  const colors = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.header}>
      <Image
        source={{ uri: coin.image.large }}
        style={styles.coinImage}
      />
      <View style={styles.headerInfo}>
        <Text style={styles.coinName}>{coin.name}</Text>
        <Text style={styles.coinSymbol}>
          {coin.symbol.toUpperCase()}
        </Text>
      </View>
      <Pressable
        onPress={onWatchlistToggle}
        style={[
          styles.watchlistButton,
          isInWatchlist && styles.watchlistButtonActive,
        ]}
      >
        <Text
          style={[
            styles.watchlistButtonText,
            isInWatchlist && styles.watchlistButtonTextActive,
          ]}
        >
          {isInWatchlist ? '★ Watching' : '☆ Watch'}
        </Text>
      </Pressable>
    </View>
  );
};
