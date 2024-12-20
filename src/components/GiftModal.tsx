import React from 'react';
import { Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface GiftModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GiftModal = ({ isOpen, onClose }: GiftModalProps) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleStart = () => {
    onClose();
    navigate('/program');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-2xl w-full max-w-md text-center animate-bounce-in">
        <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/20">
          <Gift className="w-10 h-10 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold mb-4">Поздравляем! 🎉</h2>
        <p className="text-xl mb-6">
          Вы получили <span className="text-red-500 font-bold">100 токенов</span> в подарок!
        </p>
        <button onClick={handleStart} className="btn-primary w-full">
          Начать обучение
        </button>
      </div>
    </div>
  );
};

export default GiftModal;