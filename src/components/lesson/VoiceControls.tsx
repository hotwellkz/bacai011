import React from 'react';
import { Volume2, Volume1, Play, Pause } from 'lucide-react';

interface VoiceControlsProps {
  content: string;
  onStandardVoice: () => void;
  onPremiumVoice: () => void;
  tokens: number;
  premiumCost: number;
  isPlaying: boolean;
  isPaused: boolean;
  onPause: () => void;
  onResume: () => void;
}

const VoiceControls = ({
  onStandardVoice,
  onPremiumVoice,
  tokens,
  premiumCost,
  isPlaying,
  isPaused,
  onPause,
  onResume
}: VoiceControlsProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
      <button
        onClick={onStandardVoice}
        className="btn-secondary inline-flex items-center justify-center w-full sm:w-auto"
        disabled={isPlaying}
      >
        <Volume1 className="w-5 h-5 mr-2" />
        Озвучить бесплатно
      </button>

      <button
        onClick={onPremiumVoice}
        className="btn-primary inline-flex items-center justify-center w-full sm:w-auto"
        disabled={tokens < premiumCost || isPlaying}
      >
        <Volume2 className="w-5 h-5 mr-2" />
        Озвучить красивым голосом ({premiumCost} токенов)
      </button>

      {isPlaying && (
        <button
          onClick={isPaused ? onResume : onPause}
          className="btn-secondary w-full sm:w-auto"
        >
          {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
        </button>
      )}
    </div>
  );
};

export default VoiceControls;