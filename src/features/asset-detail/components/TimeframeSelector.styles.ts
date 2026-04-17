import { StyleSheet } from 'react-native';
import { COLORS } from '@/shared/constants';

export const styles = StyleSheet.create({
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
    backgroundColor: COLORS.primary,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  textActive: {
    color: '#FFFFFF',
  },
});
