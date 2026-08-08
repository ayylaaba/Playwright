
import {test, expect} from '@playwright/test';
import HomePage from '../pages/homePage.js';
import ProductPage from '../pages/productPage.js';


test.describe('Products Details', () => {
    test('Test Case 8: Verify All Products and product detail page', async ({ page }) => {
        
        const homePage = new HomePage(page);
        const productPage = new ProductPage(page);

        await homePage.goto();
        await expect(page).toHaveTitle('Automation Exercise');

        await homePage.goToProducts();
        await expect(page).toHaveURL('https://automationexercise.com/products');
        await expect(productPage.productTitle).toBeVisible();

        await productPage.getFirstProductLink();
        await expect(page).toHaveURL('https://automationexercise.com/product_details/1');
        
        await expect(productPage.productName).toContainText('Blue Top');
        await expect(productPage.category).toContainText('Category: Women > Tops');
        await expect(productPage.availability).toContainText('Availability: In Stock');
        await expect(productPage.condition).toContainText('Condition: New');
        await expect(productPage.brand).toContainText('Brand: Polo');
    });
});