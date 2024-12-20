import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingEffectProps {
  text: string;
}

const LoadingEffect = ({ text }: LoadingEffectProps) => {
  return (
    <div className="flex items-center justify-center p-8 bg-gray-900/50 rounded-xl animate-fade-in">
      <Loader2 className="w-6 h-6 animate-spin mr-3" />
      <span className="text-lg font-medium">{text}...</span>
    </div>
  );
};

export default LoadingEffect;