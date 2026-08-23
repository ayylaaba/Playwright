// import { test, expect } from '@playwright/test';
import { test, expect } from '../test-data/fixtures.js';
import HomePage from '../pages/homePage.js';
import ProductPage from '../pages/productPage.js';
import SearchProductPage from '../pages/searchPage.js';
import registerUser from '../test-data/registerUser.js';

test.describe('Search Product', () => {
  // test('Test Case 9: Search Product', async ({ page }) => {
  //   const homePage = new HomePage(page);
  //   const searchProductPage = new SearchProductPage(page);

  //   await homePage.goto();
  //   await expect(page).toHaveTitle('Automation Exercise');

  //   await homePage.goToProducts();
  //   await expect(page).toHaveURL('https://automationexercise.com/products');
  //   await expect(page.locator('h2', { hasText: 'All Products' })).toBeVisible();

  //   await searchProductPage.setSearchInput('fancy');
  //   await expect(searchProductPage.verifySearchProductHeading).toBeVisible();
  //   await searchProductPage.verifySearchResults('fancy');
  // });

  test('Test Case 20: Search Products and Verify Cart After Login', async ({ page }) => {
    const homePage = new HomePage(page);
    const searchProductPage = new SearchProductPage(page);
    const productPage = new ProductPage(page);

    await homePage.goto();
    await expect(page).toHaveTitle('Automation Exercise');

    await homePage.goToProducts();
    await expect(page.locator('h2', { hasText: 'All Products' })).toBeVisible();

    await searchProductPage.setSearchInput('fancy');
    // await expect(searchProductPage.verifySearchProductHeading).toBeVisible({ timeout: 10000 });

    await searchProductPage.verifySearchResults('fancy');
    await searchProductPage.addAllProductsToCart();

    await homePage.goToCart();
    await expect(page).toHaveTitle('Automation Exercise - Checkout');

    const rowsBeforeLogin = await productPage.getRows();
    expect(rowsBeforeLogin).toBeGreaterThan(0);

    const user = await registerUser(page);
    await expect(homePage.loggedInAsText).toContainText(user.name);

    await homePage.goToCart();
    const rowsAfterLogin = await productPage.getRows();
    expect(rowsAfterLogin).toBe(rowsBeforeLogin);
  });


});
