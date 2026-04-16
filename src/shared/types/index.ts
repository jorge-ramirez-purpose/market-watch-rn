export type TCoinMarket = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  currentPrice: number;
  marketCap: number;
  marketCapRank: number | null;
  priceChangePercentage24h: number | null;
  sparklineIn7d: {
    price: number[];
  } | null;
};

export type TCoinDetail = {
  id: string;
  symbol: string;
  name: string;
  description: { en: string };
  image: { large: string; small: string; thumb: string };
  marketData: {
    currentPrice: { usd: number; eur: number };
    marketCap: { usd: number; eur: number };
    priceChangePercentage24h: number | null;
    priceChangePercentage7d: number | null;
    priceChangePercentage30d: number | null;
    totalVolume: { usd: number; eur: number };
    high24h: { usd: number; eur: number };
    low24h: { usd: number; eur: number };
  };
};

export type TPriceDataPoint = {
  timestamp: number;
  price: number;
};

export type TWatchlistItem = {
  coinId: string;
  addedAt: number; 
};

export type TUserPreferences = {
  currency: 'usd' | 'eur';
  theme: 'light' | 'dark';
};