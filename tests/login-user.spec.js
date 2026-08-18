// import { test, expect } from '@playwright/test';
import { test, expect } from '../test-data/fixtures.js';
import HomePage from '../pages/homePage.js';
import LoginPage from '../pages/loginPage.js';
import registerUser from '../test-data/registerUser.js';

test.describe('Login User', () => {
  test('Test Case 2: Login with correct email and password', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    const user = await registerUser(page);
    await homePage.logout();

    await homePage.goToLogin();
    await loginPage.fillLoginForm(user.email, user.password);
    await expect(homePage.loggedInAsText).toContainText(user.name);

    await homePage.deleteAccount();
  });

  test('Test Case 3: Login with incorrect email and password', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.goto();
    await homePage.goToLogin();
    await loginPage.fillLoginForm('incorrect.it@gmail.com', 'incorrectPassword.123');
    await expect(loginPage.loginErrorMsg).toBeVisible();
  });
});
