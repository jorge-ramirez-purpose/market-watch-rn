import { StyleSheet } from 'react-native';
import type { TThemeColors } from '@/shared/theme/colors';

export const createStyles = (colors: TThemeColors) =>
  StyleSheet.create({
    priceSection: {
      paddingHorizontal: 16,
      paddingBottom: 16,
    },
    price: {
      fontSize: 32,
      fontWeight: '700',
      color: colors.text,
      fontVariant: ['tabular-nums'],
    },
  });
