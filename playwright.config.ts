import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: './tests',

  /* Maximum time one test can run for. */
  timeout: 30000 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
    browserName: 'chromium',
    headless: false,
    screenshot: 'on',


    // All requests we send go to this API endpoint.
    baseURL: 'https://auth.staging.thetanarena.com',
    extraHTTPHeaders: {
      // We set this header per GitHub guidelines.
      'Accept': 'application/json',
      // Add authorization token to all requests.
      // Assuming personal access token available in the environment.
      //'Authorization': `token ${process.env.API_TOKEN}`,
      // 'Authorization':`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJKV1RfQVBJUyIsImNhbl9taW50IjpmYWxzZSwiZXhwIjoxNjY1OTc3ODQ1LCJpc3MiOiJodHRwczovL2FwaS5tYXJrZXRwbGFjZS5hcHAiLCJuYmYiOjE2NjUzNzMwNDUsInJvbGUiOjIsInNpZCI6IjB4ZDIwMWE0ZTU5ZWIxYmY1NGVhMDExZWEzMmE4YWY3ZDdlZGVhMTk0NiIsInN1YiI6InRyaW5obnRsKzIiLCJ1c2VyX2lkIjoiNjIyOWIyYTJkOGZhMWJhYWNmOGM2ZGU2In0.I5YpDSC4T8STwuIu7lx-ydfHXmer3rZ5gV_NQgXaLvs`
       // 'Authorization': `Bearer ${token}`
    },

  },


  /* Configure projects for major browsers */
  // projects: [
  //   {
  //     name: 'chromium',
  //     use: {
  //       ...devices['Desktop Chrome'],
  //     },
  //   },

  //   {
  //     name: 'firefox',
  //     use: {
  //       ...devices['Desktop Firefox'],
  //     },
  //   },

  //   {
  //     name: 'webkit',
  //     use: {
  //       ...devices['Desktop Safari'],
  //     },
  //   },



  //   /* Test against mobile viewports. */
  //   // {
  //   //   name: 'Mobile Chrome',
  //   //   use: {
  //   //     ...devices['Pixel 5'],
  //   //   },
  //   // },
  //   // {
  //   //   name: 'Mobile Safari',
  //   //   use: {
  //   //     ...devices['iPhone 12'],
  //   //   },
  //   // },

  //   /* Test against branded browsers. */
  //   // {
  //   //   name: 'Microsoft Edge',
  //   //   use: {
  //   //     channel: 'msedge',
  //   //   },
  //   // },
  //   // {
  //   //   name: 'Google Chrome',
  //   //   use: {
  //   //     channel: 'chrome',
  //   //   },
  //   // },
  // ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
};

//import type { PlaywrightTestConfig } from '@playwright/test';



export default config;
