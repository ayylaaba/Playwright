// import { test, expect } from '@playwright/test';
import { test, expect } from '../test-data/fixtures.js';
import HomePage from '../pages/homePage.js';
import LoginPage from '../pages/loginPage.js';
import registerUser from '../test-data/registerUser.js';

test.describe('Logout User', () => {
  test('Test Case 4: Logout User', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    const user = await registerUser(page);
    await homePage.logout();

    await homePage.goToLogin();
    await loginPage.fillLoginForm(user.email, user.password);
    await expect(homePage.loggedInAsText).toContainText(user.name);

    await homePage.logout();
    await expect(page).toHaveTitle('Automation Exercise - Signup / Login');
  });
});
