import React, { useState } from 'react';
import { Brain, User, Menu, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthModal from './AuthModal';
import GiftModal from './GiftModal';
import { useGiftModal } from '../hooks/useGiftModal';
import { auth } from '../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTokens } from '../hooks/useTokens';
import { useLessonProgress } from '../hooks/useLessonProgress';
import { Coins, Settings } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user] = useAuthState(auth);
  const { tokens } = useTokens();
  const { clearProgress } = useLessonProgress();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isOpen: showGiftModal, hideGiftModal } = useGiftModal();

  const handleAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleLogout = async () => {
    await auth.signOut();
    clearProgress();
    
    // Если пользователь на странице урока, перенаправляем на программу курса
    if (location.pathname.includes('/lesson')) {
      navigate('/program');
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed w-full bg-black/50 backdrop-blur-lg z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Brain className="w-8 h-8 text-red-500" />
              <span className="font-bold text-xl">BA Course</span>
            </Link>
            <Link
              to="/admin"
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors ml-2"
              title="Панель администратора"
            >
              <Settings className="w-5 h-5 text-gray-400 hover:text-white" />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">
                  Тарифы
                </Link>
                <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg">
                  <Coins className="w-5 h-5 text-yellow-500" />
                  <span className="font-medium">{tokens}</span>
                </div>
                <Link 
                  to="/profile" 
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span>{user.email}</span>
                </Link>
                <button 
                  className="btn-secondary"
                  onClick={handleLogout}
                >
                  Выйти
                </button>
              </>
            ) : (
              <>
                <Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">
                  Тарифы
                </Link>
                <button 
                  className="btn-secondary hidden md:block"
                  onClick={() => handleAuth('login')}
                >
                  Войти
                </button>
                <button 
                  className="btn-primary"
                  onClick={() => handleAuth('register')}
                >
                  Регистрация
                </button>
              </>
            )}
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-4">
            {user && (
              <div className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg">
                <Coins className="w-5 h-5 text-yellow-500" />
                <span className="font-medium">{tokens}</span>
              </div>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-gray-800 p-4 md:hidden">
              <div className="space-y-4">
                {user ? (
                  <>
                    <div className="flex items-center gap-2 text-gray-400">
                      <User className="w-5 h-5" />
                      <span className="text-sm">{user.email}</span>
                    </div>
                    <Link
                      to="/pricing"
                      className="block w-full text-left px-4 py-2 hover:bg-gray-800 rounded-lg transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Тарифы
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-800 rounded-lg transition-colors text-red-500"
                    >
                      Выйти
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/pricing"
                      className="block w-full text-left px-4 py-2 hover:bg-gray-800 rounded-lg transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Тарифы
                    </Link>
                    <button
                      onClick={() => {
                        handleAuth('login');
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      Войти
                    </button>
                    <button
                      onClick={() => {
                        handleAuth('register');
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-800 rounded-lg transition-colors text-red-500"
                    >
                      Регистрация
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
      />

      <GiftModal
        isOpen={showGiftModal}
        onClose={hideGiftModal}
      />
    </>
  );
};

export default Header;