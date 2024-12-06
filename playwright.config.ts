import { loadEnvConfig } from '@next/env';
import { defineConfig, devices } from '@playwright/test';
import { join } from 'node:path';
import { cwd, env } from 'node:process';

loadEnvConfig(cwd());

const { PORT, DEPLOYMENT_URL } = env;

const baseURL = DEPLOYMENT_URL ?? `http://localhost:${PORT ?? 3000}`;

// Reference: https://playwright.dev/docs/test-configuration
export default defineConfig({
  timeout: 30 * 1000,
  testDir: join(__dirname, 'e2e'),
  retries: 2,
  outputDir: 'test-results/',
  webServer: DEPLOYMENT_URL
    ? undefined
    : {
        command: 'pnpm dev',
        url: baseURL,
        timeout: 120 * 1000,
      },

  use: {
    baseURL,
    trace: 'retry-with-trace',
  },

  projects: [
    {
      name: 'Desktop Chrome',
      use: devices['Desktop Chrome'],
    },
    {
      name: 'Desktop Firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'Desktop Safari',
      use: devices['Desktop Safari'],
    },
    {
      name: 'Mobile Chrome',
      use: devices['Pixel 5'],
    },
    {
      name: 'Mobile Safari',
      use: devices['iPhone 12'],
    },
  ],
});
