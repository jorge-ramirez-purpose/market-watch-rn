import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useCoinDetail } from '../hooks/useCoinDetail';
import { useMarketChart } from '../hooks/useMarketChart';
import { useWatchlistStore } from '@/shared/stores/watchlistStore';
import { useSettingsStore } from '@/shared/stores/settingsStore';
import { COLORS, TIMEFRAMES } from '@/shared/constants';
import type { AssetDetailScreenProps } from '@/shared/types/navigation';
import { styles } from './AssetDetailScreen.styles';
import { Header } from '../components/AssetDetailScreen/Header';
import { Price } from '../components/AssetDetailScreen/Price';
import { Chart } from '../components/AssetDetailScreen/Chart';
import { Stats } from '../components/AssetDetailScreen/Stats';

export const AssetDetailScreen = ({ route }: AssetDetailScreenProps) => {
  const { coinId } = route.params;
  const currency = useSettingsStore((state) => state.currency);
  const [timeframe, setTimeframe] = useState<keyof typeof TIMEFRAMES>('1M');

  const { data: coin, isLoading: isLoadingDetail } = useCoinDetail(coinId);
  const { data: chartData, isLoading: isLoadingChart } = useMarketChart(
    coinId,
    TIMEFRAMES[timeframe],
  );

  const isInWatchlist = useWatchlistStore((state) =>
    state.isInWatchlist(coinId),
  );
  const addToWatchlist = useWatchlistStore((state) => state.addToWatchlist);
  const removeFromWatchlist = useWatchlistStore(
    (state) => state.removeFromWatchlist,
  );

  const handleWatchlistToggle = useCallback(() => {
    if (isInWatchlist) {
      removeFromWatchlist(coinId);
    } else {
      addToWatchlist(coinId);
    }
  }, [isInWatchlist, coinId, addToWatchlist, removeFromWatchlist]);

  if (isLoadingDetail) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!coin) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Coin not found</Text>
      </View>
    );
  }

  const price = coin.marketData.currentPrice[currency];

  return (
    <ScrollView style={styles.container}>
      <Header
        coin={coin}
        isInWatchlist={isInWatchlist}
        onWatchlistToggle={handleWatchlistToggle}
      />
      <Price
        price={price}
        priceChange24h={coin.marketData.priceChangePercentage24h}
        currency={currency}
      />
      <Chart
        timeframe={timeframe}
        onTimeframeSelect={setTimeframe}
        chartData={chartData}
        isLoading={isLoadingChart}
      />
      <Stats coin={coin} currency={currency} />
    </ScrollView>
  );
};