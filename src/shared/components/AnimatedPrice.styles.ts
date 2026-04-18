import { StyleSheet } from 'react-native';
import type { TThemeColors } from '@/shared/theme/colors';

export const createStyles = (colors: TThemeColors) =>
  StyleSheet.create({
    price: {
      fontWeight: '600',
      color: colors.text,
      fontVariant: ['tabular-nums'],
    },
    positive: {
      color: colors.positive,
    },
    negative: {
      color: colors.negative,
    },
  });
