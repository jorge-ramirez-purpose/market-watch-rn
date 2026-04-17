import React, { useCallback } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  RefreshControl,
} from 'react-native';
import { useCoins } from '../hooks/useCoins';
import { CoinListItem } from '../components/CoinListItem';
import { useSettingsStore } from '@/shared/stores/settingsStore';
import { COLORS } from '@/shared/constants';
import type { MarketOverviewScreenProps } from '@/shared/types/navigation';
import type { TCoinMarket } from '@/shared/schemas/coin';
import { styles } from './MarketOverviewScreen.styles';

export const MarketOverviewScreen = ({
  navigation,
}: MarketOverviewScreenProps) => {
  const currency = useSettingsStore((state) => state.currency);
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useCoins();

  const coins = data?.pages.flat() ?? [];

  const handleCoinPress = useCallback(
    (coinId: string) => {
      navigation.navigate('AssetDetail', { coinId });
    },
    [navigation],
  );

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderItem = useCallback(
    ({ item }: { item: TCoinMarket }) => (
      <CoinListItem
        coin={item}
        currency={currency}
        onPress={handleCoinPress}
      />
    ),
    [currency, handleCoinPress],
  );

  const renderFooter = useCallback(() => {
    if (!isFetchingNextPage) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" />
      </View>
    );
  }, [isFetchingNextPage]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>
          {error instanceof Error ? error.message : 'Something went wrong'}
        </Text>
        <Text
          style={styles.retryText}
          onPress={() => refetch()}
        >
          Tap to retry
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={coins}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor={COLORS.primary}
          />
        }
      />
    </View>
  );
};