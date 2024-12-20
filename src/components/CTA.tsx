import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center">
        <h2 className="section-title">Готовы начать обучение?</h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
          Присоединяйтесь к курсу сейчас и станьте востребованным бизнес-аналитиком уже через 6 месяцев
        </p>
        
        <button 
          className="btn-primary inline-flex items-center gap-2"
          onClick={() => navigate('/program')}
        >
          Начать обучение
          <ArrowRight className="w-5 h-5" />
        </button>
        
        <div className="mt-12 p-8 bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-3xl font-bold mb-2">50+</h3>
              <p className="text-gray-400">Выпускников уже работают</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-2">200K+</h3>
              <p className="text-gray-400">Средняя зарплата выпускника</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-2">97%</h3>
              <p className="text-gray-400">Успешных трудоустройств</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;