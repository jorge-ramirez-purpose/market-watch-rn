import { Platform } from 'react-native';

const COINGECKO_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'https://api.coingecko.com/api/v3';
const DEV_PROXY_URL = 'http://localhost:3001/api/v3';

export const API_BASE_URL =
  __DEV__ && Platform.OS === 'web' ? DEV_PROXY_URL : COINGECKO_URL;
export const COINGECKO_API_KEY = process.env.EXPO_PUBLIC_COINGECKO_API_KEY || '';

export const QUERY_KEYS = {
  coins: 'coins',
  coinDetail: 'coinDetail',
  coinMarketChart: 'coinMarketChart',
  searchCoins: 'searchCoins',
} as const;

export const COLORS = {
  primary: '#1E88E5',
  positive: '#4CAF50',
  negative: '#F44336',
  background: '#FFFFFF',
  backgroundDark: '#121212',
  surface: '#F5F5F5',
  surfaceDark: '#1E1E1E',
  text: '#212121',
  textDark: '#FAFAFA',
  textSecondary: '#757575',
  border: '#E0E0E0',
  borderDark: '#333333',
} as const;

export const TIMEFRAMES = {
  '1D': 1,
  '1W': 7,
  '1M': 30,
  '3M': 90,
  '1Y': 365,
} as const;

export const QUERY_CONFIG = {
  TWO_MINUTES: 1000 * 60 * 2,
  FIVE_MINUTES: 1000 * 60 * 5,
  RETRY_ATTEMPTS: 2,
} as const;