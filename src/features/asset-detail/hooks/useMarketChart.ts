import { useQuery } from '@tanstack/react-query';
import { fetchMarketChart } from '@/shared/api/coins';
import { QUERY_KEYS } from '@/shared/constants';
import type { TPriceDataPoint } from '@/shared/types';
import { useSettingsStore } from '@/shared/stores/settingsStore';

export const useMarketChart = (coinId: string, days: number) => {
  const currency = useSettingsStore((state) => state.currency);

  return useQuery({
    queryKey: [QUERY_KEYS.coinMarketChart, coinId, currency, days],
    queryFn: async ({ signal }) => {
      const data = await fetchMarketChart({
        coinId,
        currency,
        days,
        signal,
      });

      return data.prices.map(
        ([timestamp, price]): TPriceDataPoint => ({
          timestamp,
          price,
        }),
      );
    },
    enabled: !!coinId,
  });
}