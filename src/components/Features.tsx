import React from 'react';
import { GraduationCap, Users, Target, Brain } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Brain className="w-12 h-12 text-red-500" />,
      title: 'Персональный ИИ-учитель',
      description: 'Доступен 24/7, адаптируется под ваш темп и стиль обучения'
    },
    {
      icon: <GraduationCap className="w-12 h-12 text-red-500" />,
      title: 'Практические проекты',
      description: 'Работа с реальными кейсами и создание портфолио'
    },
    {
      icon: <Users className="w-12 h-12 text-red-500" />,
      title: 'Менторская поддержка',
      description: 'Регулярные сессии с опытными бизнес-аналитиками'
    },
    {
      icon: <Target className="w-12 h-12 text-red-500" />,
      title: 'Гарантия трудоустройства',
      description: 'Помощь в составлении резюме и подготовке к собеседованиям'
    }
  ];

  return (
    <section className="py-20 px-4 bg-black/30">
      <div className="container mx-auto">
        <h2 className="section-title text-center">Преимущества курса</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {features.map((feature, index) => (
            <div key={index} className="card">
              <div className="mb-6">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;