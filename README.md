# BA Course - Платформа для обучения бизнес-аналитиков

Онлайн-платформа для обучения профессии бизнес-аналитика с персональным ИИ-учителем.

## Начало работы

### Настройка переменных окружения

1. Скопируйте файл `.env.example` в новый файл `.env`:
```bash
cp .env.example .env
```

2. Заполните значения в файле `.env`:

- Firebase конфигурация:
  - `VITE_FIREBASE_API_KEY` - API ключ Firebase
  - `VITE_FIREBASE_AUTH_DOMAIN` - домен авторизации
  - `VITE_FIREBASE_PROJECT_ID` - ID проекта
  - `VITE_FIREBASE_STORAGE_BUCKET` - бакет для хранения
  - `VITE_FIREBASE_MESSAGING_SENDER_ID` - ID отправителя
  - `VITE_FIREBASE_APP_ID` - ID приложения

- API ключи для AI сервисов (опционально):
  - `VITE_OPENAI_API_KEY` - ключ OpenAI API
  - `VITE_ANTHROPIC_API_KEY` - ключ Anthropic API
  - `VITE_ELEVENLABS_API_KEY` - ключ ElevenLabs API

### Установка и запуск

1. Установите зависимости:
```bash
npm install
```

2. Запустите проект:
```bash
npm run dev
```

## Технологии

- React + TypeScript
- Vite
- Tailwind CSS
- Firebase (Auth + Firestore)
- OpenAI API
- ElevenLabs API

## Безопасность

- Файл `.env` содержит чувствительные данные и не должен попадать в репозиторий
- Используйте `.env.example` как шаблон для настройки окружения
- Храните ключи API в безопасном месте