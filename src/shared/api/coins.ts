import { apiClient } from './client';
import {
  coinMarketListSchema,
  coinDetailSchema,
  marketChartSchema,
  TMarketChart,
  TCoinDetail,
  TCoinMarket,
} from '@/shared/schemas/coin';

type TFetchCoinsParams = {
  currency: string;
  page: number;
  perPage?: number;
  signal?: AbortSignal;
};

export const fetchCoins = async ({
  currency,
  page,
  perPage = 20,
  signal,
}: TFetchCoinsParams): Promise<TCoinMarket[]> => {
  const data = await apiClient.get<unknown>('/coins/markets', {
    params: {
      vs_currency: currency,
      order: 'market_cap_desc',
      per_page: perPage,
      page,
      sparkline: true,
      price_change_percentage: '24h',
    },
    signal,
  });

  // Validar con Zod ANTES de devolver
  return coinMarketListSchema.parse(data);
};

export const fetchCoinDetail = async (
  coinId: string,
  signal?: AbortSignal,
): Promise<TCoinDetail> => {
  const data = await apiClient.get<unknown>(`/coins/${coinId}`, {
    params: {
      localization: false,
      tickers: false,
      market_data: true,
      community_data: false,
      developer_data: false,
    },
    signal,
  });

  return coinDetailSchema.parse(data);
};

type TFetchMarketChartParams = {
  coinId: string;
  currency: string;
  days: number;
  signal?: AbortSignal;
};

export const fetchMarketChart = async ({
  coinId,
  currency,
  days,
  signal,
}: TFetchMarketChartParams): Promise<TMarketChart> => {
  const data = await apiClient.get<unknown>(
    `/coins/${coinId}/market_chart`,
    {
      params: {
        vs_currency: currency,
        days,
      },
      signal,
    },
  );

  return marketChartSchema.parse(data);
}