import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { initializeAnalytics } from './utils/analytics';
import { validateEnv } from './utils/env';
import './index.css';

// Проверяем переменные окружения при запуске
validateEnv();

// Initialize analytics in production
if (import.meta.env.PROD) {
  initializeAnalytics();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
