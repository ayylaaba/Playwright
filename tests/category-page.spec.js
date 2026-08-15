import { expect, test } from '@playwright/test';
import HomePage from '../pages/homePage.js';
import CategoryPage from '../pages/categoryPage.js';

test.describe('Test Case 18: View Category Products', () => {
      // test('Test Case 18: View Category Products', async ({ page }) => {
      //   const homePage = new HomePage(page);
      //   const categoryPage = new CategoryPage(page);

      //   // 2-3
      //   await homePage.goto();
      //   await expect(page).toHaveTitle('Automation Exercise');
      //   await expect(categoryPage.categoryTitle).toBeVisible();

      //   // 4-5
      //   await categoryPage.openWomenCategory();
      //   await categoryPage.selectWomenSubCategory('Dress');

      //   // 6 - confirm exact text in DevTools before trusting the dash character
      //   await expect(categoryPage.categoryProductsTitle).toContainText('WOMEN', { ignoreCase: true });
      //   await expect(categoryPage.categoryProductsTitle).toContainText('DRESS', { ignoreCase: true });

      //   // 7
      //   await categoryPage.openMenCategory();
      //   await categoryPage.selectMenSubCategory('Tshirts');
      //   // 8
      //   await expect(page).toHaveURL(/category_products/);
      //   await expect(categoryPage.categoryProductsTitle).toContainText('MEN', { ignoreCase: true });
      // });


      test('Test Case 19: View & Cart Brand Products', async ({ page }) => {
        const homePage = new HomePage(page);
        const categoryPage = new CategoryPage(page);
      
        // 2
        await homePage.goto();
        await expect(page).toHaveTitle('Automation Exercise');
      
        // 3
        await homePage.goToProducts();
        await expect(page).toHaveURL('https://automationexercise.com/products');

        await page.waitForTimeout(2000); // Wait 2 seconds

        // 4
        await expect(categoryPage.brandTitle).toBeVisible();
      
        // 5-6
        await categoryPage.openBrand('Polo');
        await expect(page).toHaveURL('https://automationexercise.com/brand_products/Polo');
        await expect(categoryPage.brandProductsTitle).toContainText('Polo');
      
        await page.waitForTimeout(2000); // Wait 2 seconds

        // 7-8
        await categoryPage.openBrand('Madame');
        await expect(page).toHaveURL('https://automationexercise.com/brand_products/Madame');
        await expect(categoryPage.brandProductsTitle).toContainText('Madame');
        await page.waitForTimeout(2000); // Wait 2 seconds

      });
      
});