import { QueryClient } from '@tanstack/react-query';
import { ApiError } from '@/shared/api/client';
import { QUERY_CONFIG } from '@/shared/constants';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_CONFIG.TWO_MINUTES,
      gcTime: QUERY_CONFIG.FIVE_MINUTES,
      retry: (failureCount, error) => {
        if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
          return false;
        }
        return failureCount < QUERY_CONFIG.RETRY_ATTEMPTS;
      },
      refetchOnWindowFocus: false,
    },
  },
});
