import { useEffect, useRef, useCallback, useState } from 'react';

type TUseWebSocketOptions = {
  url: string;
  onMessage: (data: unknown) => void;
  enabled?: boolean;
}

export const useWebSocket = ({
  url,
  onMessage,
  enabled = true,
}: TUseWebSocketOptions) => {
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const connect = () => {
      const ws = new WebSocket(url);

      ws.onopen = () => {
        setIsConnected(true);
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          onMessage(data);
        } catch {
          console.warn('Received non-JSON message:', event.data);
        }
      };

      ws.onerror = () => {
        setIsConnected(false);
      };

      ws.onclose = () => {
        setIsConnected(false);
        reconnectTimerRef.current = setTimeout(connect, 5000);
      };

      wsRef.current = ws;
    };

    connect();

    return () => {
      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
      }
      wsRef.current?.close();
    };
  }, [url, onMessage, enabled]);

  const send = useCallback((data: unknown) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
    }
  }, []);

  return { isConnected, send };
}
