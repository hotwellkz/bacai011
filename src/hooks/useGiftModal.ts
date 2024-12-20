import { create } from 'zustand';

interface GiftModalStore {
  isOpen: boolean;
  showGiftModal: () => void;
  hideGiftModal: () => void;
}

export const useGiftModal = create<GiftModalStore>((set) => ({
  isOpen: false,
  showGiftModal: () => set({ isOpen: true }),
  hideGiftModal: () => set({ isOpen: false }),
}));