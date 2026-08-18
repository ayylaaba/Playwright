import { expect } from '@playwright/test';
import HomePage from '../pages/homePage.js';
import LoginPage from '../pages/loginPage.js';
import SignupPage from '../pages/signupPage.js';
import generateTestUser from './testUser.js';

async function registerUser(page) {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const signupPage = new SignupPage(page);
  const user = generateTestUser();

  await homePage.goto();
  await homePage.goToLogin();
  await loginPage.fillSignupForm(user.name, user.email);

  await expect(signupPage.signUpHeading).toBeVisible();
  await signupPage.fillAccountInformation(user.password);
  await signupPage.fillAddressInformation({ firstName: 'nour', lastName: 'hafdi' });
  await signupPage.submitForm();

  await expect(signupPage.createdMessage).toBeVisible();
  await signupPage.clickContinueButton();

  return user;
}

export default registerUser;
