import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LessonContentStore {
  content: string;
  setContent: (content: string) => void;
  clearContent: () => void;
}

export const useLessonContent = create<LessonContentStore>()(
  persist(
    (set) => ({
      content: '',
      setContent: (content) => set({ content }),
      clearContent: () => set({ content: '' }),
    }),
    {
      name: 'lesson-content-storage',
    }
  )
);