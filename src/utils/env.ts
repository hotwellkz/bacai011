/**
 * Проверка наличия всех необходимых переменных окружения
 */
export const validateEnv = (): void => {
  // Only validate env vars in production
  if (!import.meta.env.PROD) {
    return;
  }

  const optionalVars = [
    'VITE_OPENAI_API_KEY',
    'VITE_ANTHROPIC_API_KEY', 
    'VITE_ELEVENLABS_API_KEY'
  ];
  
  // Проверяем опциональные переменные
  optionalVars.forEach(key => {
    const value = import.meta.env[key];
    if (!value) {
      console.warn(`Внимание: опциональная переменная ${key} не установлена`);
    }
  });
};
