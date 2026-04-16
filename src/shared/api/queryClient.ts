import { QueryClient } from '@tanstack/react-query';
import { QUERY_CONFIG } from '@/shared/constants';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_CONFIG.TWO_MINUTES,
      gcTime: QUERY_CONFIG.FIVE_MINUTES,
      retry: QUERY_CONFIG.RETRY_ATTEMPTS,
      refetchOnWindowFocus: false,
    },
  },
});
