import { StyleSheet } from 'react-native';
import type { TThemeColors } from '@/shared/theme/colors';

export const createStyles = (colors: TThemeColors) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
    },
    coinImage: {
      width: 48,
      height: 48,
      borderRadius: 24,
    },
    headerInfo: {
      marginLeft: 12,
      flex: 1,
    },
    coinName: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.text,
    },
    coinSymbol: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 2,
    },
    watchlistButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.primary,
    },
    watchlistButtonActive: {
      backgroundColor: colors.primary,
    },
    watchlistButtonText: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.primary,
    },
    watchlistButtonTextActive: {
      color: colors.textOnPrimary,
    },
  });
