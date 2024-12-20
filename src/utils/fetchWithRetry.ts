interface RetryOptions {
  maxRetries?: number;
  initialDelay?: number;
  maxDelay?: number;
  backoffFactor?: number;
  retryCondition?: (error: Error | Response) => boolean;
}

const defaultOptions: Required<RetryOptions> = {
  maxRetries: 3,
  initialDelay: 1000,
  maxDelay: 10000,
  backoffFactor: 1.5,
  retryCondition: (error) => error instanceof Error || (error as Response).status >= 500
};

/**
 * Implements exponential backoff retry strategy for fetch requests
 */
export async function fetchWithRetry(
  url: string,
  init?: RequestInit,
  options: RetryOptions = {}
): Promise<Response> {
  const config = { ...defaultOptions, ...options };
  let lastError: Error | undefined;
  let delay = config.initialDelay;

  for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
    try {
      const response = await fetch(url, init);

      if (!config.retryCondition(response)) {
        return response;
      }
      
      lastError = new Error(`Server error: ${response.status}`);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Network request failed');
    }

    if (attempt === config.maxRetries) {
      break;
    }

    // Wait before retrying
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // Calculate next delay with exponential backoff
    delay = Math.min(delay * config.backoffFactor, config.maxDelay);
    console.log(`Retrying request (attempt ${attempt + 1}/${config.maxRetries})`);
  }

  throw lastError || new Error('Max retries exceeded');
}