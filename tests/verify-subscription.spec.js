
// import {test , expect } from "@playwright/test"
// import HomePage from '../pages/homePage';
// import generateTestUser from "../test-data/testUser";


// test.describe('Verify Subscription ', () => {

//     test('Test Case 10: Verify Subscription in home page', async({page}) => {
//         const user = generateTestUser();
//         const homePage = new HomePage(page);
//         await homePage.goto();
//         await expect(page).toHaveURL('https://automationexercise.com/');
        
//         await page.locator(".footer").scrollIntoViewIfNeeded();
//         await expect(page.locator('h2', {hasText: 'Subscription'})).toBeVisible();
        
//         await page.locator('input[id="susbscribe_email"]').fill(user.email);
//         await page.locator('button[id="subscribe"]').click();
//         await expect(page.locator('#success-subscribe')).toContainText('You have been successfully subscribed!');
    
//     });

// })


import { test, expect } from "@playwright/test";
import HomePage from '../pages/homePage';
import generateTestUser from "../test-data/testUser";

test.describe('Verify Subscription', () => {

    test('Test Case 10: Verify Subscription in home page', async ({ page }) => {
        const user = generateTestUser();
        const homePage = new HomePage(page);
        await homePage.goto();
        await expect(page).toHaveURL('https://automationexercise.com/');

        // Scroll to the Subscription heading directly
        const subscriptionHeading = page.locator('h2', { hasText: 'Subscription' });
        await subscriptionHeading.scrollIntoViewIfNeeded();
        await expect(subscriptionHeading).toBeVisible();

        await page.locator('input[id="susbscribe_email"]').fill(user.email);
        await page.locator('button[id="subscribe"]').click();
        await expect(page.locator('#success-subscribe'))
            .toContainText('You have been successfully subscribed!');
    });

    test('Test Case 11: Verify Subscription in Cart page', async ({ page }) => {

        const user = generateTestUser();
        const homePage = new HomePage(page);
        await homePage.goto();
        await expect(page).toHaveURL('https://automationexercise.com/');

        await homePage.goToCart();
        await expect(page).toHaveURL('https://automationexercise.com/view_cart');

        // Scroll to the Subscription heading directly
        const subscriptionHeading = page.locator('h2', { hasText: 'Subscription' });
        await subscriptionHeading.scrollIntoViewIfNeeded();
        await expect(subscriptionHeading).toBeVisible();

        await page.locator('input[id="susbscribe_email"]').fill(user.email);
        await page.locator('button[id="subscribe"]').click();
        await expect(page.locator('#success-subscribe'))
            .toContainText('You have been successfully subscribed!');
    });

});