import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { TUserPreferences } from '@/shared/types';

type TSettingsState = TUserPreferences & {
  setCurrency: (currency: TUserPreferences['currency']) => void;
  setTheme: (theme: TUserPreferences['theme']) => void;
};

export const useSettingsStore = create<TSettingsState>()(
  persist(
    (set) => ({
      // Estado inicial
      currency: 'usd',
      theme: 'light',

      // Acciones
      setCurrency: (currency) => set({ currency }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);