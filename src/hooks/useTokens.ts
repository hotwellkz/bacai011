import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TokenStore {
  tokens: number;
  setTokens: (tokens: number) => void;
}

export const useTokens = create<TokenStore>()(
  persist(
    (set) => ({
      tokens: 0,
      setTokens: (tokens) => set({ tokens }),
    }),
    {
      name: 'tokens-storage',
    }
  )
);