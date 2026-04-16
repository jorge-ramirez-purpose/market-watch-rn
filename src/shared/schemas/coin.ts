import { z } from 'zod';

export const coinMarketSchema = z.object({
  id: z.string(),
  symbol: z.string(),
  name: z.string(),
  image: z.url(),
  current_price: z.number(),
  market_cap: z.number(),
  market_cap_rank: z.number().nullable(),
  price_change_percentage_24h: z.number().nullable(),
  sparkline_in_7d: z
    .object({
      price: z.array(z.number()),
    })
    .nullable()
    .optional(),
}).transform((d) => ({
  id: d.id,
  symbol: d.symbol,
  name: d.name,
  image: d.image,
  currentPrice: d.current_price,
  marketCap: d.market_cap,
  marketCapRank: d.market_cap_rank,
  priceChangePercentage24h: d.price_change_percentage_24h,
  sparklineIn7d: d.sparkline_in_7d,
}));

export const coinMarketListSchema = z.array(coinMarketSchema);

export const marketChartSchema = z.object({
  prices: z.array(z.tuple([z.number(), z.number()])),
});

export const coinDetailSchema = z.object({
  id: z.string(),
  symbol: z.string(),
  name: z.string(),
  description: z.object({ en: z.string() }),
  image: z.object({
    large: z.string(),
    small: z.string(),
    thumb: z.string(),
  }),
  market_data: z.object({
    current_price: z.object({ usd: z.number(), eur: z.number() }),
    market_cap: z.object({ usd: z.number(), eur: z.number() }),
    price_change_percentage_24h: z.number().nullable(),
    price_change_percentage_7d: z.number().nullable(),
    price_change_percentage_30d: z.number().nullable(),
    total_volume: z.object({ usd: z.number(), eur: z.number() }),
    high_24h: z.object({ usd: z.number(), eur: z.number() }),
    low_24h: z.object({ usd: z.number(), eur: z.number() }),
  }),
}).transform((d) => ({
  id: d.id,
  symbol: d.symbol,
  name: d.name,
  description: d.description,
  image: d.image,
  marketData: {
    currentPrice: d.market_data.current_price,
    marketCap: d.market_data.market_cap,
    priceChangePercentage24h: d.market_data.price_change_percentage_24h,
    priceChangePercentage7d: d.market_data.price_change_percentage_7d,
    priceChangePercentage30d: d.market_data.price_change_percentage_30d,
    totalVolume: d.market_data.total_volume,
    high24h: d.market_data.high_24h,
    low24h: d.market_data.low_24h,
  },
}));

export type TCoinMarket = z.infer<typeof coinMarketSchema>;
export type TCoinDetail = z.infer<typeof coinDetailSchema>;
export type TMarketChart = z.infer<typeof marketChartSchema>;