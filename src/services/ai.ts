import { AI_CONFIG } from '../lib/ai-config';

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

interface AIResponse {
  text: string;
  tokens_used?: number;
}

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export async function queryAI(prompt: string, useTokens: number = 1): Promise<AIResponse> {
  try {
    const apiKey = AI_CONFIG.openai.apiKey;
    if (!apiKey) {
      throw new Error('OpenAI API key is not configured. Please check your environment variables.');
    }

    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: AI_CONFIG.openai.model,
        messages: [
          {
            role: 'system',
            content: 'Ты опытный преподаватель курса для бизнес-аналитиков. Отвечай подробно и структурированно.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: { message: 'Unknown error' } }));
      throw new Error(errorData.error?.message || `Request failed with status ${response.status}`);
    }

    const data: OpenAIResponse = await response.json();
    
    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Получен некорректный ответ от API');
    }

    return {
      text: data.choices[0].message.content,
      tokens_used: useTokens
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    console.error('AI Error:', message);
    throw new Error('Не удалось получить ответ от AI. Пожалуйста, попробуйте позже.');
  }
}