import { expect } from "@playwright/test";
import HomePage  from "../pages/homePage.js";
import  LoginPage  from "../pages/loginPage.js";
import SignpPage  from "../pages/signpPage.js";

import generateTestUser from "./testUser.js";

/**
 * Creates a brand-new account via the UI and returns its credentials.
 * Each test that needs "an existing account" calls this itself -
 * no more depending on another spec file having run first.
 */
 async function registerUser(page) {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const signupPage = new SignpPage(page);
  const user = generateTestUser();

  await homePage.goto();
  await homePage.goToLogin();
  await loginPage.fillSignupForm(user.name, user.email);

  await expect(signupPage.SignUpHeading).toBeVisible();
  await signupPage.fillAccountInformation(user.password);
  await signupPage.fillAddressInformation({ firstName: "nour", lastName: "hafdi" });
  await signupPage.submitForm();

  await expect(signupPage.CreatedMessage).toBeVisible();
  await signupPage.clickContinueButton();

  return user; // { name, email, password }
}

export default registerUser;
