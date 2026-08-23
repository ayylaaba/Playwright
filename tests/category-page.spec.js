// import { test, expect } from '@playwright/test';
import { test, expect } from '../test-data/fixtures.js';
import HomePage from '../pages/homePage.js';
import CategoryPage from '../pages/categoryPage.js';

test.describe('Category & Brand Products', () => {
  test('Test Case 18: View Category Products', async ({ page }) => {
    const homePage = new HomePage(page);
    const categoryPage = new CategoryPage(page);

    await homePage.goto();
    await expect(page).toHaveTitle('Automation Exercise');
    await expect(categoryPage.categoryTitle).toBeVisible();

    await categoryPage.openWomenCategory();
    await categoryPage.selectWomenSubCategory('Dress');
    await expect(categoryPage.categoryProductsTitle).toContainText('WOMEN', { ignoreCase: true });
    await expect(categoryPage.categoryProductsTitle).toContainText('DRESS', { ignoreCase: true });

    await categoryPage.openMenCategory();
    await categoryPage.selectMenSubCategory('Tshirts');
    await expect(page).toHaveURL(/category_products/);
    await expect(categoryPage.categoryProductsTitle).toContainText('MEN', { ignoreCase: true });
  });

  test('Test Case 19: View & Cart Brand Products', async ({ page }) => {
    const homePage = new HomePage(page);
    const categoryPage = new CategoryPage(page);

    await homePage.goto();
    await expect(page).toHaveTitle('Automation Exercise');

    await homePage.goToProducts();
    await expect(page).toHaveURL('https://automationexercise.com/products');
    await expect(categoryPage.brandTitle).toBeVisible();

    await categoryPage.openBrand('Polo');
    await expect(page).toHaveURL('https://automationexercise.com/brand_products/Polo');
    await expect(categoryPage.brandProductsTitle).toContainText('Polo');

    await categoryPage.openBrand('Madame');
    await expect(page).toHaveURL('https://automationexercise.com/brand_products/Madame');
    await expect(categoryPage.brandProductsTitle).toContainText('Madame');
  });


});
