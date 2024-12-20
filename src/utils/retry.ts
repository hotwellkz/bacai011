interface RetryConfig {
  retries?: number;
  delay?: number;
  backoffFactor?: number;
}

export async function retry<T>(
  fn: () => Promise<T>,
  retries: number = 3, 
  initialDelay: number = 1000,
  config: RetryConfig = {}
): Promise<T> {
  const { backoffFactor = 1.5 } = config;
  let currentDelay = initialDelay;

  try {
    return await fn();
  } catch (error) {
    if (retries === 0) throw error;
    
    console.log(`Retrying... Attempts left: ${retries}`);
    await new Promise(resolve => setTimeout(resolve, currentDelay));
    
    return retry(
      fn,
      retries - 1,
      Math.min(currentDelay * backoffFactor, 10000)
    );
  }
}