import React, { useCallback } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useQueries } from '@tanstack/react-query';
import { useWatchlistStore } from '@/shared/stores/watchlistStore';
import { useSettingsStore } from '@/shared/stores/settingsStore';
import { fetchCoins } from '@/shared/api/coins';
import { CoinListItem } from '@/features/market/components/CoinListItem';
import { QUERY_KEYS } from '@/shared/constants';
import { SwipeableRow } from '../components/SwipeableRow';
import type { TCoinMarket } from '@/shared/schemas/coin';
import { styles } from './WatchlistScreen.styles';

export const WatchlistScreen = () => {
  const items = useWatchlistStore((state) => state.items);
  const removeFromWatchlist = useWatchlistStore(
    (state) => state.removeFromWatchlist,
  );
  const currency = useSettingsStore((state) => state.currency);

  const coinIds = items.map((item) => item.coinId);

  const watchlistQuery = useQueries({
    queries: coinIds.length > 0
      ? [
          {
            queryKey: [QUERY_KEYS.coins, 'watchlist', currency, coinIds],
            queryFn: ({ signal }: { signal: AbortSignal }) =>
              fetchCoins({
                currency,
                page: 1,
                perPage: 50,
                signal,
              }),
            staleTime: 1000 * 60,
          },
        ]
      : [],
  });

  const watchlistCoins =
    watchlistQuery[0]?.data?.filter((coin) =>
      coinIds.includes(coin.id),
    ) ?? [];

  const handleCoinPress = useCallback((coinId: string) => {
    console.log('Navigate to:', coinId);
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: TCoinMarket }) => (
      <SwipeableRow onDelete={() => removeFromWatchlist(item.id)}>
        <CoinListItem
          coin={item}
          currency={currency}
          onPress={handleCoinPress}
        />
      </SwipeableRow>
    ),
    [currency, handleCoinPress, removeFromWatchlist],
  );

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>☆</Text>
        <Text style={styles.emptyTitle}>No coins in your watchlist</Text>
        <Text style={styles.emptySubtitle}>
          Add coins from the Market tab to track them here
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={watchlistCoins}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};