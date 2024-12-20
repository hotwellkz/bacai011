import React from 'react';
import { Brain, Check, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';
import { useTokens } from '../hooks/useTokens';

const PricingPage = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const { setTokens } = useTokens();

  const plans = [
    {
      name: 'AI Старт',
      price: '3,250',
      tokens: 100,
      description: 'Достаточно для знакомства с платформой и изучения основ бизнес-анализа',
      gradient: 'from-blue-500/20 to-purple-500/20',
      buttonGradient: 'bg-gradient-to-r from-blue-500 to-purple-500'
    },
    {
      name: 'AI Прорыв',
      price: '5,500',
      tokens: 300,
      description: 'Оптимальный набор для полноценного изучения бизнес-анализа с помощью ИИ',
      gradient: 'from-red-500/20 to-purple-500/20',
      buttonGradient: 'bg-gradient-to-r from-red-500 to-purple-500',
      popular: true
    },
    {
      name: 'AI Эксперт',
      price: '12,250',
      tokens: 1000,
      description: 'Максимальный набор для полного курса и будущих обновлений',
      gradient: 'from-purple-500/20 to-pink-500/20',
      buttonGradient: 'bg-gradient-to-r from-purple-500 to-pink-500'
    }
  ];

  const handlePurchase = (tokens: number) => {
    if (!user) {
      navigate('/program');
      return;
    }
    setTokens(tokens);
    navigate('/program');
  };

  return (
    <div className="pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* SEO-optimized header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Тарифы на обучение бизнес-аналитике
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Выберите подходящий тарифный план и начните обучение на бизнес-аналитика уже сегодня с персональным ИИ-учителем
          </p>
        </div>

        {/* Pricing grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-gray-900 rounded-2xl p-8 transition-transform hover:scale-105 ${
                plan.popular ? 'border-2 border-red-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Популярный выбор
                </div>
              )}

              <div className={`absolute inset-0 bg-gradient-to-r ${plan.gradient} rounded-2xl blur-3xl opacity-20`} />
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="w-8 h-8 text-red-500" />
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-400">₸</span>
                  </div>
                  <p className="text-gray-400 mt-2">{plan.description}</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>{plan.tokens} токенов</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>Персональный ИИ-учитель</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>Доступ к материалам</span>
                  </div>
                </div>

                <button
                  onClick={() => handlePurchase(plan.tokens)}
                  className={`w-full py-3 px-6 rounded-lg text-white font-semibold transition-all ${plan.buttonGradient} hover:opacity-90`}
                >
                  Начать обучение
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section for SEO */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Часто задаваемые вопросы</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-gray-900/50 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">Что такое токены?</h3>
              <p className="text-gray-400">
                Токены - это внутренняя валюта платформы, которая позволяет вам взаимодействовать с ИИ-учителем, получать ответы на вопросы и проходить уроки.
              </p>
            </div>
            <div className="bg-gray-900/50 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">Как долго действуют токены?</h3>
              <p className="text-gray-400">
                Токены не имеют срока действия и остаются на вашем балансе до их использования.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;