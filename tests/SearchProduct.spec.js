import { test, expect } from '@playwright/test';
import HomePage from '../pages/homePage.js';
import LoginPage from '../pages/loginPage.js';
import SignpPage from '../pages/signpPage.js';
import SearchProductPage from '../pages/searchPage.js';

test.describe('Search Product', () => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const signupPage = new SignpPage(page);
    const searchProductPage = new SearchProductPage(page);

    test('Verify Search Product', async ({ page }) => {
        await homePage.goto();
        await expect(page).toHaveTitle('Automation Exercise');

        // singup a new user
        await signupPage.fillSignupForm("test", "test@gmail.com");
        await signupPage.fillAccountInformation("Password.123",  "1", "January", "1990");
        await signupPage.fillAddressInformation("Test","User");
        await signupPage.submitForm();

        await homePage.goToProducts();
        await expect(page).toHaveURL('https://automationexercise.com/products');
        await expect(page.locator('h2', { hasText: 'All Products' })).toBeVisible();

        // Step 5: Enter product name in search input and click search button
        await searchProductPage.searchProduct('Blue Top');

        // Step 7: Verify 'SEARCHED PRODUCTS' is visible
        await expect(searchProductPage.verfiySearchProduct).toBeVisible();
    });
});