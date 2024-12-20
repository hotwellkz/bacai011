import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLessonProgress } from '../hooks/useLessonProgress';
import { Play, Pause, Brain, Volume2, Volume1, ChevronRight } from 'lucide-react';
import { useTokens } from '../hooks/useTokens';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';
import { queryAI } from '../services/ai';
import LessonTest from '../components/lesson/LessonTest';
import AIPromptInput from '../components/lesson/AIPromptInput';
import VoiceControls from '../components/lesson/VoiceControls';
import { useVoice } from '../hooks/useVoice';
import LoadingEffect from '../components/lesson/LoadingEffect';
import { generateVoice } from '../services/voice';
import { formatAIResponse } from '../utils/textFormatter';
import { useLessonContent } from '../hooks/useLessonContent';
import { AI_CONFIG } from '../lib/ai-config';

const LESSON_COST = 5;
const PREMIUM_VOICE_COST = 45;

const LessonPage = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const { tokens, setTokens } = useTokens();
  const { markLessonComplete } = useLessonProgress();
  const { content: savedContent, setContent, clearContent } = useLessonContent();
  const { speak, pause, resume, isPaused, isPlaying } = useVoice();
  const [isLoading, setIsLoading] = useState(false);
  const [showVoiceControls, setShowVoiceControls] = useState(false);
  const [showTest, setShowTest] = useState(false);
  const [pulseEffect, setPulseEffect] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseEffect(true);
      setTimeout(() => setPulseEffect(false), 1000);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const startLesson = async () => {
    if (tokens < LESSON_COST) return;
    
    if (!AI_CONFIG.openai.apiKey) {
      console.error('OpenAI API key is not configured');
      return;
    }

    setIsLoading(true);
    setTokens(tokens - LESSON_COST);

    try {
      const prompt = `Расскажи подробно как будто ты преподаватель и преподаешь урок на тему: Кто такой бизнес-аналитик? Основные роли и обязанности, Ключевые навыки и инструменты, Примеры задач`;
      const response = await queryAI(prompt);
      setContent(formatAIResponse(response.text));
      setShowVoiceControls(true);
    } catch (error) {
      console.error('Failed to load lesson:', error instanceof Error ? error.message : 'Unknown error');
      // Reset tokens if the API call fails
      setTokens(tokens);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePremiumVoice = async () => {
    if (tokens < PREMIUM_VOICE_COST) return;
    setTokens(tokens - PREMIUM_VOICE_COST);
    
    try {
      setIsLoading(true);
      const audioBuffer = await generateVoice(savedContent);
      const blob = new Blob([audioBuffer], { type: 'audio/mpeg' });
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.play();
    } catch (error) {
      console.error('Failed to generate premium voice:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const finishLesson = () => {
    clearContent();
    markLessonComplete('1.1');
    navigate('/program');
  };

  if (!user) {
    return (
      <div className="pt-32 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Требуется авторизация</h1>
            <p className="text-gray-400">Войдите или зарегистрируйтесь для доступа к уроку</p>
            <button 
              onClick={() => navigate('/')} 
              className="btn-primary mt-4"
            >
              Вернуться на главную
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!user.emailVerified) {
    return (
      <div className="pt-32 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Требуется подтверждение email</h1>
            <p className="text-gray-400 mb-4">
              Для доступа к урокам необходимо подтвердить email адрес. 
              Проверьте вашу почту или запросите новое письмо в профиле.
            </p>
            <button 
              onClick={() => navigate('/profile')} 
              className="btn-primary"
            >
              Перейти в профиль
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-4 max-w-[100vw] overflow-x-hidden">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">Урок 1.1: Кто такой бизнес-аналитик?</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center mb-8">
          <button
            onClick={startLesson}
            disabled={isLoading || tokens < LESSON_COST}
            className={`btn-primary ${pulseEffect ? 'animate-pulse' : ''} ${
              tokens < LESSON_COST ? 'opacity-50 cursor-not-allowed' : ''
            } w-full sm:w-auto`}
          >
            <Brain className="w-5 h-5 mr-2" />
            Начать урок (5 токенов)
          </button>

          {showVoiceControls && (
            <VoiceControls
              content={savedContent}
              onStandardVoice={() => speak(savedContent)}
              onPremiumVoice={handlePremiumVoice}
              tokens={tokens}
              premiumCost={PREMIUM_VOICE_COST}
              isPlaying={isPlaying}
              isPaused={isPaused}
              onPause={pause}
              onResume={resume}
            />
          )}
        </div>

        {isLoading && <LoadingEffect text="Готовлю урок" />}

        {savedContent && (
          <div className="prose prose-invert max-w-none mb-12 overflow-x-hidden">
            <div className="bg-gray-900/50 rounded-xl p-6">
              {savedContent}
            </div>
          </div>
        )}

        {savedContent && (
          <>
            <AIPromptInput
              suggestedQuestions={[
                'Какие основные инструменты использует бизнес-аналитик?',
                'Как стать бизнес-аналитиком с нуля?',
                'Какая средняя зарплата бизнес-аналитика?',
                'Какие soft skills нужны бизнес-аналитику?',
                'Чем отличается системный аналитик от бизнес-аналитика?'
              ]}
              tokenCost={5}
            />

            <div className="mt-12 text-center">
              <button
                onClick={() => setShowTest(true)}
                className="btn-primary w-full sm:w-auto"
              >
                Пройти тест
              </button>
            </div>

            <div className="mt-12 text-center">
              <button
                onClick={finishLesson}
                className="btn-secondary w-full sm:w-auto"
              >
                Завершить урок
              </button>
            </div>
          </>
        )}

        {showTest && (
          <LessonTest
            isOpen={showTest}
            onClose={() => setShowTest(false)}
          />
        )}
      </div>
    </div>
  );
};

export default LessonPage;