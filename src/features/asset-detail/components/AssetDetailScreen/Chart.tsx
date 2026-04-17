import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { COLORS, TIMEFRAMES } from '@/shared/constants';
import type { TPriceDataPoint } from '@/shared/types';
import { TimeframeSelector } from '../TimeframeSelector';
import { PriceChart } from '../PriceChart';
import { styles } from './Chart.styles';

type TChartProps = {
  timeframe: keyof typeof TIMEFRAMES;
  onTimeframeSelect: (timeframe: keyof typeof TIMEFRAMES) => void;
  chartData: TPriceDataPoint[] | undefined | null;
  isLoading: boolean;
};

export const Chart = ({
  timeframe,
  onTimeframeSelect,
  chartData,
  isLoading,
}: TChartProps) => {
  return (
    <>
      <TimeframeSelector selected={timeframe} onSelect={onTimeframeSelect} />
      {isLoading ? (
        <View style={styles.chartLoading}>
          <ActivityIndicator size="small" color={COLORS.primary} />
        </View>
      ) : chartData ? (
        <PriceChart data={chartData} />
      ) : null}
    </>
  );
};
