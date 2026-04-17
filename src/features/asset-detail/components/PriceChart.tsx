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
import { COLORS } from '@/shared/constants';
import type { TPriceDataPoint } from '@/shared/types';

type TPriceChartProps = {
  data: TPriceDataPoint[];
  color?: string;
};

export const PriceChart = ({ data, color }: TPriceChartProps) => {
  const chartColor = useMemo(() => {
    if (color) return color;
    if (data.length < 2) return COLORS.primary;
    return data[data.length - 1].price >= data[0].price
      ? COLORS.positive
      : COLORS.negative;
  }, [data, color]);

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
        <CartesianGrid strokeDasharray="4 4" stroke={COLORS.border} />
        <XAxis
          dataKey="timestamp"
          tick={{ fontSize: 10, fill: COLORS.textSecondary }}
          tickCount={4}
        />
        <YAxis
          tick={{ fontSize: 10, fill: COLORS.textSecondary }}
          tickCount={4}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: COLORS.background,
            border: `1px solid ${COLORS.border}`,
          }}
          labelStyle={{ color: COLORS.text }}
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