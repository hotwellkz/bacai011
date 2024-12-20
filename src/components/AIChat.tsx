import React, { useState } from 'react';
import { Send, Bot, Loader2 } from 'lucide-react';
import { queryAI } from '../services/ai';
import { useTokens } from '../hooks/useTokens';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';

const AIChat = () => {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { tokens, setTokens } = useTokens();
  const [user] = useAuthState(auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !user || tokens < 1) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await queryAI(userMessage);
      setMessages(prev => [...prev, { role: 'assistant', content: response.text }]);
      setTokens(tokens - (response.tokens_used || 1));
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Извините, произошла ошибка. Попробуйте позже.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="text-center p-8 bg-gray-900/50 rounded-xl">
        <Bot className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2">Войдите для доступа к AI</h3>
        <p className="text-gray-400">Зарегистрируйтесь чтобы получить 100 токенов</p>
      </div>
    );
  }

  if (tokens < 1) {
    return (
      <div className="text-center p-8 bg-gray-900/50 rounded-xl">
        <Bot className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2">Недостаточно токенов</h3>
        <p className="text-gray-400">Приобретите токены для продолжения общения с AI</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[600px] bg-gray-900 rounded-xl">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-4 rounded-xl ${
                message.role === 'user'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-800 text-gray-100'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-800 p-4 rounded-xl">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Задайте вопрос..."
            className="flex-1 bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="btn-primary disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-2 text-sm text-gray-400">
          Доступно токенов: {tokens}
        </div>
      </form>
    </div>
  );
};

export default AIChat;