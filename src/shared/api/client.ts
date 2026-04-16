import { API_BASE_URL } from '@/shared/constants';

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
    const url = new URL(`${API_BASE_URL}${endpoint}`);

    if (config?.params) {
      Object.entries(config.params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: config?.signal,
    });

    if (!response.ok) {
      throw new ApiError(response.status, `API error: ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  },
};