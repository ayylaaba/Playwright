// import { test, expect } from '@playwright/test';
import { test, expect } from '../test-data/fixtures.js';
import HomePage from '../pages/homePage.js';
import ProductPage from '../pages/productPage.js';
import CartPage from '../pages/cartPage.js';

test.describe('Cart', () => {
  test('Test Case 12: Add Products in Cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await homePage.goto();
    await expect(page).toHaveTitle('Automation Exercise');

    await homePage.goToProducts();
    await expect(productPage.productTitle).toBeVisible();

    await productPage.addProductToCart(0);
    await productPage.clickContinueShopping();
    await productPage.addProductToCart(1);
    await productPage.viewCartLink();

    await expect(cartPage.cartRows).toHaveCount(2);

    for (let i = 0; i < 2; i++) {
      const price = await cartPage.getProductPrice(i);
      const quantity = await cartPage.getProductQuantity(i);
      const total = await cartPage.getProductTotalPrice(i);

      expect(price).toMatch(/Rs\.\s?\d+/);
      expect(Number(quantity)).toBeGreaterThan(0);
      expect(total).toMatch(/Rs\.\s?\d+/);

      const priceNum = Number(price.replace(/[^\d]/g, ''));
      const totalNum = Number(total.replace(/[^\d]/g, ''));
      const qtyNum = Number(quantity);
      expect(totalNum).toBe(priceNum * qtyNum);
    }
  });

  test('Test Case 17: Remove Products From Cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);

    await homePage.goto();
    await expect(page).toHaveTitle('Automation Exercise');

    await homePage.goToProducts();
    await productPage.addProductToCart(0);
    await productPage.clickContinueShopping();
    await productPage.addProductToCart(1);
    await productPage.clickContinueShopping();

    await homePage.goToCart();
    await expect(page).toHaveTitle('Automation Exercise - Checkout');

    const rows = await productPage.getRows();
    expect(rows).toBe(2);

    await productPage.removeProductFromCart(1);
    await expect(productPage.cartRows).toHaveCount(rows - 1);

    await productPage.removeProductFromCart(2);
    await expect(productPage.emptyMessage).toContainText('Cart is empty!');
  });

  test('Test Case 22: Add to cart from Recommended items', async ({ page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const productPage = new ProductPage(page);

    await homePage.goto();
    await expect(page).toHaveTitle('Automation Exercise');

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(cartPage.recommendedProductsTitle).toBeVisible();

    await cartPage.addRecommendationToCart(0);
    await productPage.viewCartLink();

    const rows = await productPage.getRows();
    expect(rows).toBeGreaterThan(0);
  });




});
