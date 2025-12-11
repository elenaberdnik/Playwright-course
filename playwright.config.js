// @ts-check
import { defineConfig, devices } from '@playwright/test';
import config from "./config/config.js";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */

export default defineConfig({
  //testDir: './tests',
   testMatch: /\/tests\/.*\.spec\.js/,
    // globalSetup: "./global-setup.js",
    // globalTeardown: "./globalTeardown.js",
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: 3,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
 use: {
  baseURL: config.baseURL,
    // @ts-ignore
  httpCredentials: config.httpCredentials,
  headless: false, 
  viewport: { width: 1280, height: 720 },
  trace: 'on',
  video: 'on',
  screenshot: {
    fullPage: true,
    mode: 'on',
  },
},


  /* Configure projects for major browsers */
   projects: [
      {
          name: 'setup',
          testMatch: /\/tests\/setup\/.*\.setup\.js/,
          use: { ...devices['Desktop Chrome'] },
      },
      {
          name: 'smoke',
          dependencies: ['setup'],
          grep: /@my-label/,
          use: {
              ...devices['Desktop Chrome'],
                viewport: { width: 1920, height: 1080 },
              trace: 'on',
              screenshot: {
                  fullPage: true,
                  mode: "on"
              },
    
          },
           expect: {
    timeout: 5000, 
  },
      },
      {
          name: 'regression',
          dependencies: ['setup'],
          grepInvert: /@my-label/,
          use: { ...devices['Desktop Chrome'] },
      },


    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

