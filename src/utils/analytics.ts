// Простая реализация аналитики без Firebase
export const initializeAnalytics = async () => {
  try {
    // В будущем здесь будет реализация аналитики
    console.info('Analytics initialization skipped');
    return null;
  } catch (error) {
    console.warn('Analytics initialization failed:', error);
    return null;
  }
};