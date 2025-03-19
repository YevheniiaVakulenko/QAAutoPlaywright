import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 2, 
  reporter: [['line'],['html']],
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
      name: "setup",
      use: { ...devices["Desktop Chrome"]},
      testMatch: /.*\.setup\.ts/
    },
    {
      name: 'NORM',
      use: 
      { 
        ...devices['Desktop Chrome'],
        baseURL: process.env.BASEURL_NORM,
      },
      dependencies: ["setup"],
    },

    {
      name: 'BUG',
      use: 
      { 
        ...devices['Desktop Chrome'],
        baseURL: process.env.BASEURL_BUG
      },
      dependencies: ["setup"],
    },
  ],
});
