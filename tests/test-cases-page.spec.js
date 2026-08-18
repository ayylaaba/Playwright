// import { test, expect } from '@playwright/test';
import { test, expect } from '../test-data/fixtures.js';
import HomePage from '../pages/homePage.js';

test.describe('Test Cases Page', () => {
  test('Test Case 7: Verify Test Cases Page', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto();
    await expect(page).toHaveTitle('Automation Exercise');
    await homePage.goToTestCases();
    await expect(page).toHaveURL('https://automationexercise.com/test_cases');
    await expect(page.locator('h2', { hasText: 'Test Cases' })).toBeVisible();
  });
});
