import { StyleSheet } from 'react-native';
import type { TThemeColors } from '@/shared/theme/colors';

export const createStyles = (colors: TThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingTop: 20,
    },
    sectionTitle: {
      fontSize: 13,
      fontWeight: '600',
      color: colors.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 1,
      paddingHorizontal: 16,
      marginBottom: 8,
    },
    settingRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 14,
      backgroundColor: colors.background,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    settingLabel: {
      fontSize: 16,
      color: colors.text,
    },
    segmentedControl: {
      flexDirection: 'row',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.primary,
      overflow: 'hidden',
    },
    segment: {
      paddingHorizontal: 16,
      paddingVertical: 6,
    },
    segmentActive: {
      backgroundColor: colors.primary,
    },
    segmentText: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.primary,
    },
    segmentTextActive: {
      color: colors.textOnPrimary,
    },
    infoSection: {
      padding: 16,
      marginTop: 40,
      alignItems: 'center',
    },
    infoText: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    infoSubtext: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 4,
    },
  });
