import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  BookOpen, 
  ChevronRight, 
  CheckCircle,
  Star,
  Clock,
  Users,
  Brain
} from 'lucide-react';
import { useLessonProgress } from '../hooks/useLessonProgress';

const ProgramPage = () => {
  const { isLessonCompleted } = useLessonProgress();
  const [hoveredModule, setHoveredModule] = useState<number | null>(null);

  const modules = [
    {
      title: 'Основы бизнес-анализа',
      description: 'Базовые концепции и основы профессии',
      duration: '2 недели',
      lessons: [
        {
          id: '1.1',
          title: 'Кто такой бизнес-аналитик?',
          duration: '45 минут',
          path: '/lesson/1.1',
          topics: [
            'Основные роли и обязанности',
            'Ключевые навыки и инструменты',
            'Примеры задач',
            'Тест: Понимание роли бизнес-аналитика'
          ]
        },
        {
          id: '1.2',
          title: 'Жизненный цикл разработки (SDLC)',
          duration: '60 минут',
          comingSoon: true,
          topics: [
            'Основные этапы SDLC',
            'Роль бизнес-аналитика на каждом этапе',
            'Agile vs. Waterfall',
            'Тест: Основы SDLC и роль аналитика'
          ]
        }
      ]
    },
    {
      title: 'Модуль 2: Основы анализа требований',
      description: 'Методики работы с требованиями и стейкхолдерами',
      duration: '3 недели',
      lessons: [
        {
          id: '2.1',
          title: 'Сбор требований',
          duration: '60 минут',
          comingSoon: true,
          topics: [
            'Методы сбора требований (интервью, опросы, мозговые штурмы)',
            'Работа с ключевыми заинтересованными сторонами (stakeholders)',
            'Тест: Методы сбора требований'
          ]
        },
        {
          id: '2.2',
          title: 'Документирование требований',
          duration: '45 минут',
          comingSoon: true,
          topics: [
            'Создание BRD (Business Requirements Document)',
            'User stories и Acceptance criteria',
            'Тест: Форматы и структура требований'
          ]
        },
        {
          id: '2.3',
          title: 'Управление изменениями требований',
          duration: '45 минут',
          comingSoon: true,
          topics: [
            'Как отслеживать изменения',
            'Управление версиями и согласования',
            'Тест: Управление изменениями требований'
          ]
        }
      ]
    },
    {
      title: 'Модуль 3: Методы и инструменты анализа',
      description: 'Практические инструменты и методологии',
      duration: '3 недели',
      lessons: [
        {
          id: '3.1',
          title: 'SWOT, PESTEL и другие методы анализа',
          duration: '60 минут',
          comingSoon: true,
          topics: [
            'Описание методов',
            'Примеры применения',
            'Тест: Методы анализа и их практическое применение'
          ]
        },
        {
          id: '3.2',
          title: 'Моделирование процессов',
          duration: '75 минут',
          comingSoon: true,
          topics: [
            'Основы BPMN (Business Process Model and Notation)',
            'Построение диаграмм процессов',
            'Тест: Понимание BPMN'
          ]
        },
        {
          id: '3.3',
          title: 'Инструменты аналитика',
          duration: '60 минут',
          comingSoon: true,
          topics: [
            'Обзор инструментов (Jira, Confluence, MS Visio)',
            'Практика работы с одним из инструментов',
            'Тест: Навыки работы с инструментами'
          ]
        }
      ]
    },
    {
      title: 'Модуль 4: Управление проектами',
      description: 'Основы проектного управления',
      duration: '2 недели',
      lessons: [
        {
          id: '4.1',
          title: 'Основы проектного менеджмента',
          duration: '60 минут',
          comingSoon: true,
          topics: [
            'Основные понятия (scope, schedule, budget)',
            'Взаимодействие с командой проекта',
            'Тест: Понимание основ управления проектами'
          ]
        },
        {
          id: '4.2',
          title: 'Agile и Scrum',
          duration: '60 минут',
          comingSoon: true,
          topics: [
            'Основы Agile',
            'Роль бизнес-аналитика в Scrum-команде',
            'Тест: Основы Agile'
          ]
        }
      ]
    },
    {
      title: 'Модуль 5: Практическое применение знаний',
      description: 'Работа с реальными проектами',
      duration: '2 недели',
      lessons: [
        {
          id: '5.1',
          title: 'Кейсы реального мира',
          duration: '90 минут',
          comingSoon: true,
          topics: [
            'Работа с примером реального проекта',
            'Анализ требований и создание документации',
            'Тест: Кейсы и практика'
          ]
        },
        {
          id: '5.2',
          title: 'Финальный проект',
          duration: '120 минут',
          comingSoon: true,
          topics: [
            'Разработка полного набора документации для вымышленного проекта',
            'Презентация проекта',
            'Оценка: Завершение проекта'
          ]
        }
      ]
    }
  ];

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-500 px-4 py-2 rounded-full mb-6">
            <Brain className="w-5 h-5" />
            <span>Интерактивное обучение</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Программа обучения
          </h1>
          
          <p className="text-xl text-gray-400">
            Структурированный курс с практическими заданиями и поддержкой ИИ-преподавателя
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
          <div className="bg-gray-900/50 rounded-xl p-6 text-center transform transition-transform hover:scale-105">
            <Clock className="w-8 h-8 text-red-500 mx-auto mb-3" />
            <div className="text-2xl font-bold mb-1">6 месяцев</div>
            <p className="text-gray-400">Длительность курса</p>
          </div>
          
          <div className="bg-gray-900/50 rounded-xl p-6 text-center transform transition-transform hover:scale-105">
            <Users className="w-8 h-8 text-red-500 mx-auto mb-3" />
            <div className="text-2xl font-bold mb-1">12 человек</div>
            <p className="text-gray-400">Размер группы</p>
          </div>
          
          <div className="bg-gray-900/50 rounded-xl p-6 text-center transform transition-transform hover:scale-105">
            <Star className="w-8 h-8 text-red-500 mx-auto mb-3" />
            <div className="text-2xl font-bold mb-1">24/7</div>
            <p className="text-gray-400">Поддержка ИИ</p>
          </div>
        </div>

        {/* Modules */}
        <div className="max-w-4xl mx-auto space-y-8">
          {modules.map((module, moduleIndex) => (
            <div
              key={moduleIndex}
              className={`bg-gray-900/50 rounded-2xl p-8 transition-all duration-300 transform ${
                hoveredModule === moduleIndex ? 'scale-[1.02]' : ''
              }`}
              onMouseEnter={() => setHoveredModule(moduleIndex)}
              onMouseLeave={() => setHoveredModule(null)}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">{module.title}</h2>
                  <p className="text-gray-400">{module.description}</p>
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    {module.duration}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {module.lessons.map((lesson, lessonIndex) => (
                  <div
                    key={lessonIndex}
                    className={`bg-black/30 rounded-xl p-4 ${
                      lesson.comingSoon ? 'opacity-50' : 'hover:bg-black/50'
                    } transition-colors`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-5 h-5 text-red-500" />
                        {lesson.comingSoon ? (
                          <span className="text-gray-400">{lesson.title}</span>
                        ) : lesson.path ? (
                          <Link
                            to={lesson.path}
                            className="hover:text-red-500 transition-colors"
                          >
                            {lesson.title}
                          </Link>
                        ) : (
                          <span className="text-gray-400">{lesson.title}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">
                          {lesson.duration}
                        </span>
                        {isLessonCompleted(lesson.id) ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : lesson.comingSoon ? (
                          <span className="text-sm text-gray-500">Скоро</span>
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-500" />
                        )}
                      </div>
                    </div>
                    {lesson.topics && (
                      <div className="mt-3 ml-8 space-y-1">
                        {lesson.topics.map((topic, topicIndex) => (
                          <div
                            key={topicIndex}
                            className="text-sm text-gray-400 flex items-center gap-2"
                          >
                            <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                            {topic}
                          </div>
                        ))}
                    </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgramPage;