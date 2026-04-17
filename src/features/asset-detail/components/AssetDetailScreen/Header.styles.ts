import { StyleSheet } from 'react-native';
import { COLORS } from '@/shared/constants';

export const styles = StyleSheet.create({
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
    color: COLORS.text,
  },
  coinSymbol: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  watchlistButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  watchlistButtonActive: {
    backgroundColor: COLORS.primary,
  },
  watchlistButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  watchlistButtonTextActive: {
    color: '#FFFFFF',
  },
});
