// import { test, expect } from '@playwright/test';
import { test, expect } from '../test-data/fixtures.js';
import HomePage from '../pages/homePage.js';
import LoginPage from '../pages/loginPage.js';
import SignupPage from '../pages/signupPage.js';
import generateTestUser from '../test-data/testUser.js';
import registerUser from '../test-data/registerUser.js';

test.describe('Register User', () => {
  test('Test Case 1: Register User', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const signupPage = new SignupPage(page);
    const user = generateTestUser();

    await homePage.goto();
    await expect(page).toHaveURL('https://automationexercise.com/');

    await homePage.goToLogin();
    await expect(page.getByText('New User Signup!')).toBeVisible();
    await loginPage.fillSignupForm(user.name, user.email);

    await expect(signupPage.signUpHeading).toBeVisible();
    await signupPage.fillAccountInformation(user.password);
    await signupPage.fillAddressInformation({ firstName: 'John', lastName: 'Doe' });
    await signupPage.submitForm();

    await expect(signupPage.createdMessage).toBeVisible();
    await signupPage.clickContinueButton();
    await expect(homePage.loggedInAsText).toContainText(user.name);

    await homePage.deleteAccount();
    await expect(signupPage.verifyAccountDeleted).toBeVisible();
    await signupPage.clickContinueButton();
  });

  test('Test Case 5: Register with an existing email', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    const user = await registerUser(page);
    await homePage.logout();

    await homePage.goToLogin();
    await loginPage.fillSignupForm(user.name, user.email);
    await expect(loginPage.signUpErrorMsg).toBeVisible();
  });
});
