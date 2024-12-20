import { AI_CONFIG } from '../lib/ai-config';

export async function generateVoice(text: string): Promise<ArrayBuffer> {
  const apiKey = AI_CONFIG.elevenlabs.apiKey;
  if (!apiKey) {
    throw new Error('ElevenLabs API key is not configured');
  }

  const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'xi-api-key': apiKey
    },
    body: JSON.stringify({
      text,
      model_id: 'eleven_multilingual_v2',
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75
      }
    })
  });

  if (!response.ok) {
    throw new Error('Failed to generate voice');
  }

  return await response.arrayBuffer();
}