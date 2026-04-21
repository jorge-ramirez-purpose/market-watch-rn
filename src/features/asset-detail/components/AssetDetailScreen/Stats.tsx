import React from 'react';
import { View } from 'react-native';
import { formatCurrency, formatMarketCap } from '@/shared/utils/formatters';
import { StatRow } from '../StatRow';
import { styles } from './Stats.styles';
import { TCoinDetail } from '@/shared/schemas/coin';

type TStatsProps = {
  coin: TCoinDetail;
  currency: string;
};

export const Stats = ({ coin, currency }: TStatsProps) => {
  const marketCap = coin.marketData.marketCap[currency as 'usd' | 'eur'];

  return (
    <View style={styles.statsContainer}>
      <StatRow label="Market Cap" value={formatMarketCap(marketCap)} />
      <StatRow
        label="24h High"
        value={formatCurrency(
          coin.marketData.high24h[currency as 'usd' | 'eur'],
          currency,
        )}
      />
      <StatRow
        label="24h Low"
        value={formatCurrency(
          coin.marketData.low24h[currency as 'usd' | 'eur'],
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
