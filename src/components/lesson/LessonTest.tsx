import React, { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

interface LessonTestProps {
  isOpen: boolean;
  onClose: () => void;
}

const questions = [
  {
    question: 'Какова основная роль бизнес-аналитика?',
    options: [
      'Разработка программного обеспечения',
      'Анализ и оптимизация бизнес-процессов',
      'Управление персоналом',
      'Продажи продуктов'
    ],
    correct: 1
  },
  {
    question: 'Какой навык НЕ является ключевым для бизнес-аналитика?',
    options: [
      'Коммуникативные навыки',
      'Аналитическое мышление',
      'Программирование на C++',
      'Документирование требований'
    ],
    correct: 2
  },
  {
    question: 'Что из перечисленного является инструментом бизнес-аналитика?',
    options: [
      'JIRA',
      'Photoshop',
      'AutoCAD',
      'Final Cut Pro'
    ],
    correct: 0
  }
];

const LessonTest = ({ isOpen, onClose }: LessonTestProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  if (!isOpen) return null;

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const calculateScore = () => {
    const correctAnswers = answers.filter(
      (answer, index) => answer === questions[index].correct
    ).length;
    return Math.round((correctAnswers / questions.length) * 10);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-2xl w-full max-w-2xl mx-4 animate-fade-in">
        {!showResult ? (
          <>
            <div className="mb-8">
              <div className="text-sm text-gray-400 mb-2">
                Вопрос {currentQuestion + 1} из {questions.length}
              </div>
              <h3 className="text-xl font-bold">
                {questions[currentQuestion].question}
              </h3>
            </div>

            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="w-full text-left p-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="text-6xl font-bold mb-4">{calculateScore()}/10</div>
            <div className="flex justify-center gap-4 mb-8">
              {answers.map((answer, index) => (
                <div key={index}>
                  {answer === questions[index].correct ? (
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-500" />
                  )}
                </div>
              ))}
            </div>
            <button onClick={onClose} className="btn-primary">
              Завершить тест
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonTest;