
import {test, expect} from '@playwright/test';

import HomePage from '../pages/homePage.js';

import ContactPage from '../pages/contactPage.js';
import path from 'path';

test.describe('Contact Us Form', () => {

    test ('test Contact Us form', async ({page}) => {

        const homePage = new HomePage(page);
        const contactPage = new ContactPage(page);

        await homePage.goto();
        await expect(page).toHaveTitle('Automation Exercise');

        await homePage.goToContactUs();
        await expect(page.locator('h2', {hasText: 'Get In Touch'})).toBeVisible();

        // Fill in the contact form
        await contactPage.fillContactForm("nour", "nour1@gmail.com", "Subject", "Test Message", path.join(__dirname, '../test-data/testFile.txt'));
        await contactPage.submitForm();
        await contactPage.homeButton.click();

    });
});