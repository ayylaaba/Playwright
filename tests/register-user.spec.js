
import {test, expect} from '@playwright/test';
import HomePage from '../pages/homePage.js';
import LoginPage from '../pages/loginPage.js';
import SignpPage from '../pages/signpPage.js';
import generateTestUser from "../test-data/testUser.js";
import registerUser from '../test-data/registerUser.js';

test.describe('Register User', () => {
    
    test('Test Case 1: Register User', async ({ page }) => {

        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
        const signupPage = new SignpPage(page);
    
        const user = generateTestUser(); // just the data, NOT the full flow
        
        console.log('Generated user:', user);
        
        await homePage.goto();
        await expect(page).toHaveURL('https://automationexercise.com/');
       
        await homePage.goToLogin();
        await expect(page.getByText('New User Signup!')).toBeVisible();

        await loginPage.fillSignupForm(user.name, user.email);
        
        await expect(loginPage.SignUpHeading).toBeVisible();

        await signupPage.fillAccountInformation(user.password);
        await signupPage.fillAddressInformation({firstName: 'John', lastName: 'Doe'});
        await signupPage.submitForm();
        await expect(signupPage.CreatedMessage).toBeVisible();
        await signupPage.clickContinueButton();
        await expect(page.locator('a', { hasText: 'Logged in as' })).toContainText('Logged in as ');

        await homePage.deleteAccount();
        await expect(signupPage.verfiyAccountDeleted).toBeVisible();
        await signupPage.clickContinueButton();

    });


    test('Test Case 3: Login User with existing email and password', async ({ page }) => {
      const homePage = new HomePage(page);
      const loginPage = new LoginPage(page);
      
      const user = await registerUser(page); // just the data, NOT the full flow
      
      await homePage.logout();

      // No account needed at all for this one - that's the whole point
      await homePage.goToLogin();
      await loginPage.fillSignupForm(user.name, user.email);
      await expect(loginPage.loginErrorMsg).toBeVisible();
    });


});
  
