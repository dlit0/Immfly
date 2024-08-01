import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'https://highlifeshop.com',
    browserName: 'chromium',
    headless: true,
  },
});
