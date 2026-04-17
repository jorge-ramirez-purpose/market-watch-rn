import { StyleSheet } from 'react-native';
import { COLORS } from '@/shared/constants';

export const styles = StyleSheet.create({
  priceSection: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  price: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.text,
    fontVariant: ['tabular-nums'],
  },
});
