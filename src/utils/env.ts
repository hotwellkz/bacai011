/**
 * Безопасное получение переменных окружения с валидацией
 */
export const getEnvVar = (key: string, required: boolean = true): string => {
  const value = import.meta.env[key];
  
  if (!value && required) {
    throw new Error(
      `Отсутствует обязательная переменная окружения: ${key}. ` +
      'Пожалуйста, проверьте файл .env'
    );
  }
  
  return value || '';
};

/**
 * Проверка наличия всех необходимых переменных окружения
 */
export const validateEnv = (): void => {
  const requiredVars = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID'
  ];

  const optionalVars = [
    'VITE_OPENAI_API_KEY',
    'VITE_ANTHROPIC_API_KEY', 
    'VITE_ELEVENLABS_API_KEY'
  ];

  // Проверяем обязательные переменные
  requiredVars.forEach(key => getEnvVar(key, true));
  
  // Проверяем опциональные переменные
  optionalVars.forEach(key => {
    const value = getEnvVar(key, false);
    if (!value) {
      console.warn(`Внимание: опциональная переменная ${key} не установлена`);
    }
  });
};