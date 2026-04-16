const MILLION = 1_000_000;
const BILLION = 1_000_000_000;
const TRILLION = 1_000_000_000_000;

export const formatCurrency = (
  value: number,
  currency: string = 'usd',
): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
    maximumFractionDigits: value < 1 ? 6 : 2,
  }).format(value);

export const formatMarketCap = (value: number): string => {
  if (value >= TRILLION) return `$${(value / TRILLION).toFixed(2)}T`;
  if (value >= BILLION) return `$${(value / BILLION).toFixed(2)}B`;
  if (value >= MILLION) return `$${(value / MILLION).toFixed(2)}M`;
  return `$${value.toLocaleString()}`;
};

export const formatCompactNumber = (value: number): string =>
  Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(value);