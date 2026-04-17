import React from 'react';
import { View } from 'react-native';
import type { TCoinDetail } from '@/shared/types';
import { formatCurrency, formatMarketCap } from '@/shared/utils/formatters';
import { StatRow } from '../StatRow';
import { styles } from './Stats.styles';

type TStatsProps = {
  coin: TCoinDetail;
  currency: string;
};

export const Stats = ({ coin, currency }: TStatsProps) => {
  const marketCap = coin.marketData.marketCap[currency];

  return (
    <View style={styles.statsContainer}>
      <StatRow label="Market Cap" value={formatMarketCap(marketCap)} />
      <StatRow
        label="24h High"
        value={formatCurrency(
          coin.marketData.high24h[currency],
          currency,
        )}
      />
      <StatRow
        label="24h Low"
        value={formatCurrency(
          coin.marketData.low24h[currency],
          currency,
        )}
      />
      <StatRow
        label="7d Change"
        value={null}
        changeValue={coin.marketData.priceChangePercentage7d}
      />
      <StatRow
        label="30d Change"
        value={null}
        changeValue={coin.marketData.priceChangePercentage30d}
      />
    </View>
  );
};
