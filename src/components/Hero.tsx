import React from 'react';
import { Brain, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-500 px-4 py-2 rounded-full mb-8">
          <Brain className="w-5 h-5" />
          <span>ИИ-обучение</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Курс Бизнес Аналитик
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12">
          Освойте профессию бизнес-аналитика с персональным ИИ-учителем, который доступен 24/7 и адаптируется под ваш темп обучения
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            className="btn-primary"
            onClick={() => navigate('/program')}
          >
            Начать обучение
          </button>
          <button 
            className="btn-secondary"
            onClick={() => navigate('/program')}
          >
            Узнать программу
          </button>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="card">
            <h3 className="text-2xl font-bold mb-2">6 месяцев</h3>
            <p className="text-gray-400">Длительность курса</p>
          </div>
          <div className="card">
            <h3 className="text-2xl font-bold mb-2">24/7</h3>
            <p className="text-gray-400">Поддержка ИИ-учителя</p>
          </div>
          <div className="card">
            <h3 className="text-2xl font-bold mb-2">100%</h3>
            <p className="text-gray-400">Трудоустройство</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;