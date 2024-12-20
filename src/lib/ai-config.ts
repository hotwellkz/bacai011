import { getEnvVar } from '../utils/env';

export const AI_CONFIG = {
  openai: {
    apiKey: getEnvVar('VITE_OPENAI_API_KEY'),
    model: 'gpt-4'
  },
  anthropic: {
    apiKey: getEnvVar('VITE_ANTHROPIC_API_KEY'),
    model: 'claude-3-opus-20240229'
  },
  elevenlabs: {
    apiKey: getEnvVar('VITE_ELEVENLABS_API_KEY')
  }
};