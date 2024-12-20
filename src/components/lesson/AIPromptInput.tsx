import React, { useState } from 'react';
import { Send, MessageSquare } from 'lucide-react';
import { queryAI } from '../../services/ai';
import { useTokens } from '../../hooks/useTokens';
import LoadingEffect from './LoadingEffect';

interface AIPromptInputProps {
  suggestedQuestions: string[];
  tokenCost: number;
}

const AIPromptInput = ({ suggestedQuestions, tokenCost }: AIPromptInputProps) => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { tokens, setTokens } = useTokens();

  const handleSubmit = async (question: string) => {
    if (tokens < tokenCost) return;
    
    setIsLoading(true);
    setTokens(tokens - tokenCost);

    try {
      const response = await queryAI(question);
      setResponse(response.text);
    } catch (error) {
      console.error('Failed to get AI response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-900/50 rounded-xl p-4 sm:p-6">
        <h3 className="text-xl font-bold mb-4">Популярные вопросы</h3>
        <div className="grid gap-2">
          {suggestedQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleSubmit(question)}
              className="text-left hover:bg-gray-800 p-3 rounded-lg transition-colors flex items-start sm:items-center gap-2 text-sm sm:text-base"
              disabled={tokens < tokenCost}
            >
              <MessageSquare className="w-5 h-5 text-red-500 flex-shrink-0" />
              <span>{question}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gray-900/50 rounded-xl p-4 sm:p-6">
        <h3 className="text-xl font-bold mb-4">Задать свой вопрос</h3>
        <div className="space-y-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Введите ваш вопрос..."
            className="w-full bg-gray-800 rounded-lg p-4 min-h-[100px] resize-y text-sm sm:text-base"
          />
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
            <span className="text-sm text-gray-400">
              Стоимость: {tokenCost} токенов
            </span>
            <button
              onClick={() => handleSubmit(prompt)}
              disabled={!prompt.trim() || isLoading || tokens < tokenCost}
              className="btn-primary w-full sm:w-auto"
            >
              <Send className="w-5 h-5 mr-2" />
              Отправить
            </button>
          </div>
        </div>
      </div>

      {isLoading && <LoadingEffect text="Генерирую ответ" />}

      {response && (
        <div className="bg-gray-900/50 rounded-xl p-6 prose prose-invert max-w-none">
          {response}
        </div>
      )}
    </div>
  );
};

export default AIPromptInput;