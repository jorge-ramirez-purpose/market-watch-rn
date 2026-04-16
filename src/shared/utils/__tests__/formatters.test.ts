import { formatCurrency, formatMarketCap, formatCompactNumber } from '../formatters';

describe('formatCurrency', () => {
  it('formats USD by default', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
  });

  it('formats EUR', () => {
    expect(formatCurrency(1234.56, 'eur')).toBe('€1,234.56');
  });

  it('shows 6 decimal places for values below 1', () => {
    const result = formatCurrency(0.000123);
    expect(result).toBe('$0.000123');
  });

  it('accepts uppercase currency code', () => {
    expect(formatCurrency(100, 'USD')).toBe('$100.00');
  });
});

describe('formatMarketCap', () => {
  it('formats trillions', () => {
    expect(formatMarketCap(1_200_000_000_000)).toBe('$1.20T');
  });

  it('formats billions', () => {
    expect(formatMarketCap(5_400_000_000)).toBe('$5.40B');
  });

  it('formats millions', () => {
    expect(formatMarketCap(8_700_000)).toBe('$8.70M');
  });

  it('formats values below a million', () => {
    expect(formatMarketCap(500_000)).toBe('$500,000');
  });
});

describe('formatCompactNumber', () => {
  it('compacts thousands', () => {
    expect(formatCompactNumber(1_500)).toBe('1.5K');
  });

  it('compacts millions', () => {
    expect(formatCompactNumber(2_000_000)).toBe('2M');
  });

  it('formats small numbers as-is', () => {
    expect(formatCompactNumber(42)).toBe('42');
  });
});
