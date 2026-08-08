
import { test, expect } from '@playwright/test';
import HomePage from '../pages/homePage';
import LoginPage from '../pages/loginPage';
import SignpPage from '../pages/signpPage';

test.describe('Login User', () => {
    
    test('Test Case 2: Login User with correct email and password', async ({ page }) => {
        // Objects created HERE, using THIS test's own page
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
    
        const user = await registerUser(page);
        await homePage.logout();
    
        await homePage.goToLogin();
        await loginPage.fillLoginForm(user.email, user.password);
    
        await expect(homePage.loggedInAsText).toContainText(user.name);
        await homePage.deleteAccount();
    });

    test('Test Case 3: Login User with incorrect email and password', async ({ page }) => {
      const homePage = new HomePage(page);
      const loginPage = new LoginPage(page);

      // No account needed at all for this one - that's the whole point
      await homePage.goto();
      await homePage.goToLogin();
      await loginPage.fillLoginForm('incorrect.it@gmail.com', 'incorrectPassword.123');
  
      await expect(loginPage.loginErrorMsg).toBeVisible();
    });

});

