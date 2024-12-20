import React from 'react';
import { ChevronRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLessonProgress } from '../hooks/useLessonProgress';

const Curriculum = () => {
  const { isLessonCompleted } = useLessonProgress();

  const modules = [
    {
      title: 'Основы бизнес-анализа',
      lessons: [
        {
          id: '1.1',
          title: 'Кто такой бизнес-аналитик?',
          path: '/lesson/1.1'
        }
      ]
    },
    {
      title: 'Сбор и анализ требований',
      topics: ['Техники выявления требований', 'Документирование требований', 'Валидация и верификация']
    },
    {
      title: 'Моделирование бизнес-процессов',
      topics: ['BPMN 2.0', 'UML диаграммы', 'Оптимизация процессов']
    },
    {
      title: 'Работа с данными',
      topics: ['SQL основы', 'Анализ данных', 'Визуализация']
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="section-title text-center">Программа обучения</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {modules.map((module, index) => (
            <div key={index} className="card">
              <h3 className="text-xl font-bold mb-4">{module.title}</h3>
              <ul className="space-y-3">
                {module.lessons?.map((lesson, lessonIndex) => (
                  <li
                    key={lessonIndex}
                    className="flex items-center justify-between text-gray-400 hover:text-white transition-colors"
                  >
                    <Link
                      to={lesson.path}
                      className="flex items-center flex-1"
                    >
                      <ChevronRight className="w-5 h-5 text-red-500 mr-2" />
                      {lesson.title}
                    </Link>
                    {isLessonCompleted(lesson.id) && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Curriculum;