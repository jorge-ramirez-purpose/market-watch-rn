import { useSettingsStore } from '@/shared/stores/settingsStore';
import { lightColors, darkColors } from '@/shared/theme/colors';
import type { TThemeColors } from '@/shared/theme/colors';

export const useTheme = (): TThemeColors => {
  const theme = useSettingsStore((state) => state.theme);
  return theme === 'dark' ? darkColors : lightColors;
};
