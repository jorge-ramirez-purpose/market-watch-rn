import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useTheme } from '@/shared/hooks/useTheme';
import type { TPriceDataPoint } from '@/shared/types';

type TPriceChartProps = {
  data: TPriceDataPoint[];
  color?: string;
};

export const PriceChart = ({ data, color }: TPriceChartProps) => {
  const colors = useTheme();

  const chartColor = useMemo(() => {
    if (color) return color;
    if (data.length < 2) return colors.primary;
    return data[data.length - 1].price >= data[0].price
      ? colors.positive
      : colors.negative;
  }, [data, color, colors]);

  const chartData = useMemo(
    () =>
      data.map((point) => ({
        timestamp: new Date(point.timestamp).toLocaleDateString(),
        price: point.price,
      })),
    [data],
  );

  if (data.length === 0) return null;

  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
        <CartesianGrid strokeDasharray="4 4" stroke={colors.border} />
        <XAxis
          dataKey="timestamp"
          tick={{ fontSize: 10, fill: colors.textSecondary }}
          tickCount={4}
        />
        <YAxis
          tick={{ fontSize: 10, fill: colors.textSecondary }}
          tickCount={4}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: colors.background,
            border: `1px solid ${colors.border}`,
          }}
          labelStyle={{ color: colors.text }}
        />
        <Line
          type="monotone"
          dataKey="price"
          stroke={chartColor}
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
