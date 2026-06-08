import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();
// local → reads .env
// CI → reads GitHub Secrets automatically, dotenv does nothing

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 1,

  use: {
    baseURL: process.env.BASE_URL,       // used in every goto('/')
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  reporter: [['html', { open: 'never' }]],

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox',  use: { ...devices['Desktop Firefox'] } }
    // { name: 'webkit',   use: { ...devices['Desktop Safari'] } },
  ],
});