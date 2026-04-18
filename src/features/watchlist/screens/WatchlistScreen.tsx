import React, { useCallback, useMemo } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useWatchlistStore } from '@/shared/stores/watchlistStore';
import { useSettingsStore } from '@/shared/stores/settingsStore';
import { useTheme } from '@/shared/hooks/useTheme';
import { fetchCoins } from '@/shared/api/coins';
import { CoinListItem } from '@/features/market/components/CoinListItem';
import { QUERY_KEYS } from '@/shared/constants';
import { SwipeableRow } from '../components/SwipeableRow';
import type { TCoinMarket } from '@/shared/schemas/coin';
import { createStyles } from './WatchlistScreen.styles';

export const WatchlistScreen = () => {
  const items = useWatchlistStore((state) => state.items);
  const removeFromWatchlist = useWatchlistStore(
    (state) => state.removeFromWatchlist,
  );
  const currency = useSettingsStore((state) => state.currency);
  const colors = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const coinIds = useMemo(() => items.map((item) => item.coinId), [items]);

  const { data: allCoins = [] } = useQuery({
    queryKey: [QUERY_KEYS.coins, 'watchlist', currency],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      fetchCoins({
        currency,
        page: 1,
        perPage: 50,
        signal,
      }),
    enabled: items.length > 0,
    staleTime: 1000 * 60,
  });

  const watchlistCoins = useMemo(
    () => allCoins.filter((coin) => coinIds.includes(coin.id)),
    [allCoins, coinIds],
  );

  const handleCoinPress = useCallback((coinId: string) => {
    console.info('Navigate to:', coinId);
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
