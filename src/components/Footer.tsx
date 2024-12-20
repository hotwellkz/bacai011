import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const links = [
    { title: 'Программа курса', href: '/program' },
    { title: 'Тарифы', href: '/pricing' },
    { title: 'Политика конфиденциальности', href: '/privacy' },
    { title: 'Публичная оферта', href: '/terms' }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black/30 py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-8">
          {links.map((link, index) => (
            <React.Fragment key={link.href}>
              <Link 
                to={link.href}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {link.title}
              </Link>
              {index < links.length - 1 && (
                <span className="hidden md:block text-gray-600">•</span>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="text-center text-gray-400">
          © {currentYear} Курс Бизнес Аналитик. Все права защищены.
        </div>
      </div>
    </footer>
  );
};

export default Footer;