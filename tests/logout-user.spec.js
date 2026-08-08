// import { test, expect } from '@playwright/test';
// import HomePage from '../pages/homePage.js';
// import LoginPage from '../pages/loginPage.js';
// import SignpPage from '../pages/signpPage.js';
// import registerUser  from '../test-data/registerUser.js';

// test.describe('Logout User', () => {
//     test('Logout User', async ({page}) => {    
//         const homePage = new HomePage(page);
//         const signupPage = new SignpPage(page);

//         const user = await registerUser(page);

//         await homePage.goto();
//         await expect(page).toHaveTitle('Automation Exercise');

//         await homePage.goToLogin();

//         // await signupPage.fillLoginForm(user.email, user.password);

//         // await expect(homePage.loggedInAsText).toBeVisible();

//         // await homePage.logout();
//         // await expect(page).toHaveTitle('Automation Exercise - Signup / Login');
//     });
// });


import { test, expect } from '@playwright/test';
import HomePage from '../pages/homePage.js';
import LoginPage from '../pages/loginPage.js';
import registerUser  from '../test-data/registerUser.js';

test.describe('Logout User', () => {
  test('Logout User', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    // registerUser() leaves us already logged in - log out first so we're
    // in a known, clean starting state for THIS test
    const user = await registerUser(page);

    console.log(`Registered user: ${user.name} <${user.email}>`);

    await homePage.logout();

    // Now the /login link genuinely exists again
    await homePage.goToLogin();
    await loginPage.fillLoginForm(user.email, user.password);
    await expect(homePage.loggedInAsText).toContainText(user.name);

    // The actual thing this test verifies
    await homePage.logout();
    await expect(page).toHaveTitle('Automation Exercise - Signup / Login');
  });
});