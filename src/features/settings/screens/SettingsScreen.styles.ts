import { StyleSheet } from 'react-native';
import { COLORS } from '@/shared/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
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
    backgroundColor: COLORS.background,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.border,
  },
  settingLabel: {
    fontSize: 16,
    color: COLORS.text,
  },
  segmentedControl: {
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primary,
    overflow: 'hidden',
  },
  segment: {
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  segmentActive: {
    backgroundColor: COLORS.primary,
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  segmentTextActive: {
    color: '#FFFFFF',
  },
  infoSection: {
    padding: 16,
    marginTop: 40,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  infoSubtext: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
});
