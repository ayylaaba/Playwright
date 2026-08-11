import { test, expect } from '@playwright/test';
import HomePage from '../pages/homePage.js';
import ProductPage from '../pages/productPage.js';
import CartPage from '../pages/cartPage.js';

test.describe('Test Case 12: Add Products in Cart', () => {
  test('Test Case 12: Add Products in Cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await homePage.goto();
    await expect(page).toHaveTitle('Automation Exercise');

    await homePage.goToProducts();
    await expect(productPage.productTitle).toBeVisible();

    await productPage.addProductToCart(0); // 1st product
    await productPage.clickContinueShopping();

    await productPage.addProductToCart(1); // 2nd product
    await productPage.viewCartLink();

    // Step 9: Verify both products are added to Cart
    await expect(cartPage.cartRows).toHaveCount(2);

    // Step 10: Verify their prices, quantity and total price
    for (let i = 0; i < 2; i++) {
        const name = await cartPage.getProductName(i);
        const price = await cartPage.getProductPrice(i);
        const quantity = await cartPage.getProductQuantity(i);
        const total = await cartPage.getProductTotalPrice(i);

        console.log(`Row ${i}: name=${name}, price=${price}, qty=${quantity}, total=${total}`);

        // Basic sanity checks - real values, not empty
        expect(price).toMatch(/Rs\.\s?\d+/);
        expect(Number(quantity)).toBeGreaterThan(0);
        expect(total).toMatch(/Rs\.\s?\d+/);

      // The real math check: price × quantity should equal the total
      const priceNum = Number(price.replace(/[^\d]/g, ''));
      const totalNum = Number(total.replace(/[^\d]/g, ''));
      const qtyNum = Number(quantity);
      expect(totalNum).toBe(priceNum * qtyNum);
    }
  });

  test('Test Case 17: Remove Products From Cart', async({page}) => {
    
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);

    await homePage.goto();
    await expect(page).toHaveTitle('Automation Exercise');

    await homePage.goToProducts();

    await productPage.addProductToCart(0);
    await productPage.clickContinueShopping();
    await productPage.addProductToCart(1);


    await homePage.goToCart();
    await expect(page).toHaveTitle('Automation Exercise - Checkout');

    const rows = await productPage.getRows();
    await expect(rows).toBe(2);

    await productPage.removeProductFromCart(1);
    
    await expect(productPage.CartRows).toHaveCount(rows - 1);
    
    await productPage.removeProductFromCart(2);
    await expect(productPage.emptyMessage).toContainText('Cart is empty!');
  })

});
