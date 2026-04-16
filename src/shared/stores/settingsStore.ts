import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TUserPreferences } from '../types';

type TSettingsState = TUserPreferences & {
  setCurrency: (currency: TUserPreferences['currency']) => void;
  setTheme: (theme: TUserPreferences['theme']) => void;
};

export const useSettingsStore = create<TSettingsState>()(
  persist(
    (set) => ({
      currency: 'usd',
      theme: 'light',

      setCurrency: (currency) => set({ currency }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);