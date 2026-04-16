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