import React from 'react';
import { Brain, MessageCircle, Clock, Sparkles } from 'lucide-react';

const AITeacher = () => {
  return (
    <section className="py-20 px-4 bg-black/30">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="section-title">Персональный ИИ-учитель</h2>
            <p className="text-xl text-gray-400 mb-8">
              Ваш личный наставник, который всегда рядом и готов помочь в любое время дня и ночи
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MessageCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Мгновенные ответы</h3>
                  <p className="text-gray-400">Получайте ответы на вопросы и объяснения сложных тем в любое время</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-red-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Доступность 24/7</h3>
                  <p className="text-gray-400">Учитесь в своем темпе, когда вам удобно</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Sparkles className="w-6 h-6 text-red-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Адаптивное обучение</h3>
                  <p className="text-gray-400">ИИ подстраивается под ваш уровень и стиль обучения</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-gray-900 p-8 rounded-3xl border border-gray-800">
              <div className="flex items-center gap-3 mb-6">
                <Brain className="w-8 h-8 text-red-500" />
                <span className="font-semibold">ИИ Ассистент</span>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-gray-400">Как описать бизнес-процесс с помощью BPMN?</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <p>Давайте разберем пошагово создание BPMN диаграммы:</p>
                  <ol className="list-decimal list-inside space-y-2 mt-2 text-gray-400">
                    <li>Определите границы процесса</li>
                    <li>Выделите основные события</li>
                    <li>Опишите последовательность действий</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AITeacher;