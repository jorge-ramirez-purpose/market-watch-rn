import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import type { TCoinDetail } from '@/shared/types';
import { styles } from './Header.styles';

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
