import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const routes: Record<string, string> = {
  lesson: 'Урок',
  program: 'Программа курса',
  pricing: 'Тарифы',
  profile: 'Профиль',
  privacy: 'Политика конфиденциальности',
  terms: 'Публичная оферта',
  admin: 'Панель администратора'
};

const getLessonTitle = (pathname: string) => {
  if (pathname.includes('lesson/1.1')) {
    return 'Кто такой бизнес-аналитик?';
  }
  return '';
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  if (pathnames.length === 0) return null;

  const isLesson = pathnames[0] === 'lesson';

  return (
    <div className="bg-black/30 border-b border-gray-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Link to="/" className="hover:text-white transition-colors">
            Главная
          </Link>
          {pathnames.map((path, index) => {
            const isLast = index === pathnames.length - 1;
            const title = isLesson && isLast ? getLessonTitle(location.pathname) : routes[path];

            return (
              <React.Fragment key={path}>
                <ChevronRight className="w-4 h-4" />
                {isLast ? (
                  <span className="text-white">{title}</span>
                ) : (
                  <Link
                    to={`/${pathnames.slice(0, index + 1).join('/')}`}
                    className="hover:text-white transition-colors"
                  >
                    {title}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Breadcrumbs;