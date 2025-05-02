import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src',
  timeout: 30000,
  retries: 0,
  use: {
    baseURL: 'https://www.automationexercise.com',
    headless: false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },
});
