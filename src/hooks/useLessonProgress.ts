import { create } from 'zustand';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

interface LessonProgress {
  completedLessons: string[];
  markLessonComplete: (lessonId: string) => void;
  isLessonCompleted: (lessonId: string) => boolean;
  loadProgress: () => Promise<void>;
  clearProgress: () => void;
}

export const useLessonProgress = create<LessonProgress>((set, get) => ({
  completedLessons: [],
  
  markLessonComplete: async (lessonId: string) => {
    const user = auth.currentUser;
    if (!user) return;

    const newLessons = [...get().completedLessons, lessonId];
    set({ completedLessons: newLessons });

    // Сохраняем прогресс в Firebase
    await setDoc(doc(db, 'userProgress', user.uid), {
      completedLessons: newLessons
    });
  },

  isLessonCompleted: (lessonId: string) => 
    get().completedLessons.includes(lessonId),

  loadProgress: async () => {
    const user = auth.currentUser;
    if (!user) {
      set({ completedLessons: [] });
      return;
    }

    const progressDoc = await getDoc(doc(db, 'userProgress', user.uid));
    if (progressDoc.exists()) {
      set({ completedLessons: progressDoc.data().completedLessons });
    } else {
      set({ completedLessons: [] });
    }
  },

  clearProgress: () => {
    set({ completedLessons: [] });
  }
}));