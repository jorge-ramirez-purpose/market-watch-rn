import { StyleSheet } from 'react-native';
import type { TThemeColors } from '@/shared/theme/colors';

export const createStyles = (colors: TThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: colors.background,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    pressed: {
      backgroundColor: colors.surface,
    },
    leftSection: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    image: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
    nameContainer: {
      marginLeft: 12,
      flex: 1,
    },
    name: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    symbol: {
      fontSize: 13,
      color: colors.textSecondary,
      marginTop: 2,
    },
    rightSection: {
      alignItems: 'flex-end',
    },
    price: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      fontVariant: ['tabular-nums'],
    },
  });
