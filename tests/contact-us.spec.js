// import { test, expect } from '@playwright/test';
import { test, expect } from '../test-data/fixtures.js';
import path from 'path';
import { fileURLToPath } from 'url';
import HomePage from '../pages/homePage.js';
import ContactPage from '../pages/contactPage.js';

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

test.describe('Contact Us Form', () => {
  test('Test Case 6: Submit the Contact Us form', async ({ page }) => {
    const homePage = new HomePage(page);
    const contactPage = new ContactPage(page);

    await homePage.goto();
    await expect(page).toHaveTitle('Automation Exercise');

    await homePage.goToContactUs();
    await expect(page.locator('h2', { hasText: 'Get In Touch' })).toBeVisible();

    const filePath = path.join(__dirname, '../test-data/testFile.txt');
    
    await contactPage.fillContactForm(
      "nour",
      "nour1@gmail.com",
      "Subject",
      "Test Message",
      filePath
    );

    await contactPage.submitForm();
    // await contactPage.submitForm();

    // const bodyText = await page.locator('body').innerText();
    // console.log('Contains "Success"?', bodyText.includes('Success'));
    // console.log('Contains "submitted"?', bodyText.includes('submitted'));
    
    // await page.screenshot({ path: 'debug-contact-submit.png', fullPage: true });
    
    // await contactPage.homeButton.click();

  });

});
