import { expect, test } from '@playwright/test';
import HomePage from '../pages/homePage.js';
import CategoryPage from '../pages/categoryPage.js';

test.describe('Test Case 18: View Category Products', () => {
  test('Test Case 18: View Category Products', async ({ page }) => {
    const homePage = new HomePage(page);
    const categoryPage = new CategoryPage(page);

    // 2-3
    await homePage.goto();
    await expect(page).toHaveTitle('Automation Exercise');
    await expect(categoryPage.categoryTitle).toBeVisible();

    // 4-5
    await categoryPage.openWomenCategory();
    await categoryPage.selectWomenSubCategory('Dress');

    // 6 - confirm exact text in DevTools before trusting the dash character
    await expect(categoryPage.categoryProductsTitle).toContainText('WOMEN', { ignoreCase: true });
    await expect(categoryPage.categoryProductsTitle).toContainText('DRESS', { ignoreCase: true });

    // 7
    await categoryPage.openMenCategory();
    await categoryPage.selectMenSubCategory('Tshirts');
    // 8
    await expect(page).toHaveURL(/category_products/);
    await expect(categoryPage.categoryProductsTitle).toContainText('MEN', { ignoreCase: true });
});
});