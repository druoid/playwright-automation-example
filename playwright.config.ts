import { defineConfig } from "@playwright/test";
import * as dotenv from 'dotenv';
import * as fs from 'fs';

const envFile = process.env.ENV === 'test' ? '.env.test' : '.env.dev';
if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
}

export default defineConfig({
  testDir: "./src",
  timeout: 30000,
  retries: 0,
  use: {
    baseURL: process.env.BASE_URL,
    headless: false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },
});
