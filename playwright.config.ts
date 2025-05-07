import { defineConfig } from "@playwright/test";
import * as dotenv from 'dotenv';
import * as fs from 'fs';

const env = process.env.ENV || 'dev'; // default to 'dev'
const envFile = `.env.${env}`;

if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
} else {
  throw new Error(`Environment file ${envFile} not found!`);
}

export default defineConfig({
  testDir: "./src",
  timeout: 30000,
  retries: 0,
  use: {
    baseURL: process.env.BASE_URL,
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },
  globalSetup: require.resolve('./global-setup')
});
