import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: 1,
  reporter: [['html', { open: 'never'}], ['list']],
  use: {
    baseURL: 'https://automationexercise.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    // {
    //   name: 'chromium', 
    //   use: { ...devices['Desktop Chrome'] }
    // },
    // {
    //   name: 'chromium-private',
    //   use: { 
    //     ...devices['Desktop Chrome'],
    //     launchOptions: {
    //       args: ['--incognito']
    //     }
    //   }
    // },
    {
      name: 'brave-private',
      use: { 
        ...devices['Desktop Chrome'],
        launchOptions: {
          // Path to Brave on macOS
          executablePath: '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
          args: ['--incognito']
        }
      }
    },
    //{
      // name: 'firefox-private',
      // use: { 
      //   ...devices['Desktop Firefox'],
      //   launchOptions: {
      //     args: ['--private-window']
      //   }
      // }
    //}
  ],

});