// import { test, expect } from '@playwright/test';
import { test, expect } from '../test-data/fixtures.js';
import HomePage from '../pages/homePage.js';

test.describe('Scroll Behavior', () => {
  test(`Test Case 25: Verify Scroll Up using 'Arrow' button`, async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto();
    await expect(page).toHaveTitle('Automation Exercise');

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.locator('h2', { hasText: 'Subscription' })).toBeVisible();

    await homePage.arrowButton.click();

    await expect(page.getByRole('heading', {
      name: 'Full-Fledged practice website for Automation Engineers',
    })).toBeVisible();
  });

  test(`Test Case 26: Verify Scroll Up without 'Arrow' button`, async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto();
    await expect(page).toHaveTitle('Automation Exercise');

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.locator('h2', { hasText: 'Subscription' })).toBeVisible();

    await page.evaluate(() => window.scrollTo(0, 0));

    await expect(page.getByRole('heading', {
      name: 'Full-Fledged practice website for Automation Engineers',
    })).toBeVisible();
  });
});
