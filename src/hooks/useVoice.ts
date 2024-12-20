import { useState } from 'react';

export const useVoice = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  let utterance: SpeechSynthesisUtterance | null = null;

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ru-RU';
      
      utterance.onend = () => {
        setIsPlaying(false);
        setIsPaused(false);
      };

      setIsPlaying(true);
      setIsPaused(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const pause = () => {
    window.speechSynthesis.pause();
    setIsPaused(true);
  };

  const resume = () => {
    window.speechSynthesis.resume();
    setIsPaused(false);
  };

  return {
    speak,
    pause,
    resume,
    isPlaying,
    isPaused
  };
};