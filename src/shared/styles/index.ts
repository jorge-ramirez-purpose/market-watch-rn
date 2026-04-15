import { StyleSheet } from 'react-native';
import { COLORS } from '@/shared/constants';

export { COLORS };

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const TYPOGRAPHY = {
  heading: { fontSize: 24, fontWeight: '600' as const },
  subheading: { fontSize: 18, fontWeight: '600' as const },
  body: { fontSize: 14, fontWeight: '400' as const },
  caption: { fontSize: 12, fontWeight: '400' as const },
} as const;

export const commonStyles = StyleSheet.create({
  screenContainer: { flex: 1, backgroundColor: COLORS.background },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  row: { flexDirection: 'row', alignItems: 'center' },
  screenPadding: { padding: SPACING.md },
});
