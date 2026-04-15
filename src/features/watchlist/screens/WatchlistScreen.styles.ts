import { StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY, commonStyles } from '@/shared/styles';

export const styles = StyleSheet.create({
  container: commonStyles.centered,
  text: { ...TYPOGRAPHY.heading, color: COLORS.text },
});