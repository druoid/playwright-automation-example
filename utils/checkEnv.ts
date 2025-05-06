import fetch from 'node-fetch';

export async function isEnvReachable(baseUrl: string): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(baseUrl, {
      method: 'HEAD',
      signal: controller.signal as any // Type assertion needed due to type mismatch
    });

    clearTimeout(timeout);
    return response.ok;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`Error checking environment reachability: ${errorMessage}`);
    return false;
  }
}