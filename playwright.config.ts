import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 2, 
  reporter: 'html',
  outputDir: 'test-results',
  timeout: 30000,
  use: {
    httpCredentials: {
      username: process.env.HTTP_CREDS_USERNAME|| '',
      password: process.env.HTTP_CREDS_PASSWORD|| '',
    },
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure'
  },

  projects: [
    {
      name: 'NORM',
      use: 
      { 
        ...devices['Desktop Chrome'],
        baseURL: process.env.BASEURL_NORM
      },
    },

    {
      name: 'BUG',
      use: 
      { 
        ...devices['Desktop Chrome'],
        baseURL: process.env.BASEURL_BUG
      },
    },
  ],
});
