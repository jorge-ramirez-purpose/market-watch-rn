import { StyleSheet } from 'react-native';
import type { TThemeColors } from '@/shared/theme/colors';

export const createStyles = (colors: TThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    errorText: {
      fontSize: 16,
      color: colors.negative,
      textAlign: 'center',
      marginBottom: 12,
    },
    retryText: {
      fontSize: 14,
      color: colors.primary,
      fontWeight: '600',
    },
    footer: {
      paddingVertical: 20,
    },
  });
