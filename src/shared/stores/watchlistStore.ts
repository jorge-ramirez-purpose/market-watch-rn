import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TWatchlistItem } from '../types';

type TWatchlistState = {
  items: TWatchlistItem[];
  addToWatchlist: (coinId: string) => void;
  removeFromWatchlist: (coinId: string) => void;
  isInWatchlist: (coinId: string) => boolean;
  reorderWatchlist: (fromIndex: number, toIndex: number) => void;
}

export const useWatchlistStore = create<TWatchlistState>()(
  persist(
    immer((set, get) => ({
      items: [],

      addToWatchlist: (coinId) =>
        set((state) => {
          state.items.push({
            coinId,
            addedAt: Date.now(),
          });
        }),

      removeFromWatchlist: (coinId) =>
        set((state) => {
          state.items = state.items.filter((item) => item.coinId !== coinId);
        }),

      isInWatchlist: (coinId) => {
        return get().items.some((item) => item.coinId === coinId);
      },

      reorderWatchlist: (fromIndex, toIndex) =>
        set((state) => {
          const [moved] = state.items.splice(fromIndex, 1);
          state.items.splice(toIndex, 0, moved);
        }),
    })),
    {
      name: 'watchlist-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);