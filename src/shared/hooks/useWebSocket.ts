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
  const [isConnected, setIsConnected] = useState(false);

  const connect = useCallback(() => {
    if (!enabled) return;

    const ws = new WebSocket(url);

    ws.onopen = () => {
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch {
        console.warn('Received non-JSON message:', event.data);}
    };

    ws.onerror = () => {
      setIsConnected(false);
    };

    ws.onclose = () => {
      setIsConnected(false);
      setTimeout(connect, 5000);
    };

    wsRef.current = ws;
  }, [url, onMessage, enabled]);

  useEffect(() => {
    connect();

    return () => {
      wsRef.current?.close();
    };
  }, [connect]);

  const send = useCallback((data: unknown) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
    }
  }, []);

  return { isConnected, send };
}