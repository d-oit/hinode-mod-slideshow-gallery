import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Read from ".env" file.
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Use the environment variable for the base URL
const baseURL = process.env.BASE_URL_TESTING || 'http://localhost:1313';


export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'Desktop Chrome',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: 'Desktop Firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: 'Desktop Safari',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 5'],
        viewport: { width: 412, height: 915 },
      },
    },
    {
      name: 'Mobile Safari',
      use: {
        ...devices['iPhone 12'],
        viewport: { width: 390, height: 844 },
      },
    },
  ],
  webServer: {
    ignoreHTTPSErrors: true,
    command: 'npm run start',
    url: baseURL,
    reuseExistingServer: process.env.REUSE_SERVER === 'true',
    timeout: 60000, 
    stdout: 'pipe',  // Pipe the output
    stderr: 'pipe',  // Pipe the error output
    reporter: 'list',
    // Add a pattern to wait for
    readyPattern: 'Web Server is available at', // Adjust this to match Hugo's actual output
  }
});
