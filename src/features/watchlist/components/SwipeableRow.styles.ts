import { StyleSheet } from 'react-native';
import type { TThemeColors } from '@/shared/theme/colors';

export const createStyles = (colors: TThemeColors) =>
  StyleSheet.create({
    container: {
      overflow: 'hidden',
    },
    deleteContainer: {
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
      width: '30%',
      backgroundColor: colors.negative,
      justifyContent: 'center',
      alignItems: 'center',
    },
    deleteText: {
      color: colors.textOnPrimary,
      fontWeight: '700',
      fontSize: 16,
    },
    row: {
      backgroundColor: colors.background,
    },
  });
