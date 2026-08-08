
import {test, expect} from '@playwright/test';
import HomePage from '../pages/homePage.js';
import LoginPage from '../pages/loginPage.js';
import SignpPage from '../pages/signpPage.js';

test.describe('Test Cases Page', () => {

    test('Verify Test Cases Page', async ({ page }) => {
        const homePage = new HomePage(page);

        await homePage.goto();
        await expect(page).toHaveTitle('Automation Exercise');
        await homePage.goToTestCases();
        await expect(page).toHaveURL('https://automationexercise.com/test_cases');
        await expect(page.locator('h2', { hasText: 'Test Cases' })).toBeVisible();
    });

});