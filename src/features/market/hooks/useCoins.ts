import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchCoins } from '@/shared/api/coins';
import { QUERY_KEYS } from '@/shared/constants';
import { useSettingsStore } from '@/shared/stores/settingsStore';

export const useCoins = () => {
  const currency = useSettingsStore((state) => state.currency);

  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.coins, currency],
    queryFn: ({ pageParam, signal }) =>
      fetchCoins({ currency, page: pageParam, signal }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length < 20 ? undefined : allPages.length + 1;
    },
  });
};