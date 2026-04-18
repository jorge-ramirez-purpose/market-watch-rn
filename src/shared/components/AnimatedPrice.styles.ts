import { StyleSheet } from 'react-native';
import { COLORS } from '@/shared/constants';

export const styles = StyleSheet.create({
  price: {
    fontWeight: '600',
    color: COLORS.text,
    fontVariant: ['tabular-nums'],
  },
  positive: {
    color: COLORS.positive,
  },
  negative: {
    color: COLORS.negative,
  },
});
