import { useQuery } from '@tanstack/react-query';
import { fetchCoinDetail } from '@/shared/api/coins';
import { QUERY_KEYS } from '@/shared/constants';

export const useCoinDetail = (coinId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.coinDetail, coinId],
    queryFn: ({ signal }) => fetchCoinDetail(coinId, signal),
    enabled: !!coinId, 
  });
};