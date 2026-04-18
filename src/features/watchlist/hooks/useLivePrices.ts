import { useCallback, useState } from 'react';
import { useWebSocket } from '@/shared/hooks/useWebSocket';

const COINCAP_WS_URL = 'wss://ws.coincap.io/prices?assets=';

type TLivePrices = {
  [coinId: string]: number;
}

export const useLivePrices = (coinIds: string[]) => {
  const [prices, setPrices] = useState<TLivePrices>({});

  const handleMessage = useCallback((data: unknown) => {
    if (typeof data === 'object' && data !== null) {
      setPrices((prev) => ({
        ...prev,
        ...(data as TLivePrices),
      }));
    }
  }, []);

  const url = `${COINCAP_WS_URL}${coinIds.join(',')}`;

  const { isConnected } = useWebSocket({
    url,
    onMessage: handleMessage,
    enabled: coinIds.length > 0,
  });

  return { prices, isConnected };
}