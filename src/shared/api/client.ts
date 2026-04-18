import { API_BASE_URL, COINGECKO_API_KEY } from '@/shared/constants';

export type TRequestConfig = {
  params?: Record<string, string | number | boolean>;
  signal?: AbortSignal;
};

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const apiClient = {
  async get<T>(endpoint: string, config?: TRequestConfig): Promise<T> {
    // In production web, use Vercel proxy; otherwise use API_BASE_URL
    const baseUrl = typeof window !== 'undefined' && !__DEV__
      ? '/api/coingecko'
      : API_BASE_URL;

    const url = new URL(`${baseUrl}${endpoint}`, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');

    if (config?.params) {
      Object.entries(config.params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(API_BASE_URL === COINGECKO_API_KEY ? { 'x-cg-demo-api-key': COINGECKO_API_KEY } : {}),
      },
      signal: config?.signal,
    });

    if (!response.ok) {
      throw new ApiError(response.status, `API error: ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  },
};