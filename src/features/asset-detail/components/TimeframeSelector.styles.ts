import { StyleSheet } from 'react-native';
import type { TThemeColors } from '@/shared/theme/colors';

export const createStyles = (colors: TThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    button: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
    },
    buttonActive: {
      backgroundColor: colors.primary,
    },
    text: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.textSecondary,
    },
    textActive: {
      color: colors.textOnPrimary,
    },
  });
