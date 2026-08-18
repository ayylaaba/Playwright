# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: contact-us.spec.js >> Contact Us Form >> Test Case 6: Submit the Contact Us form
- Location: tests/contact-us.spec.js:13:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('a.btn.btn-success[href="/"]')

```

# Page snapshot

```yaml
- generic [ref=f2e1]:
  - banner [ref=f2e2]:
    - generic [ref=f2e5]:
      - link [ref=f2e8] [cursor=pointer]:
        - /url: /
        - img "Website for automation practice" [ref=f2e9]
      - list [ref=f2e12]:
        - listitem [ref=f2e13]:
          - link " Home" [ref=f2e14] [cursor=pointer]:
            - /url: /
            - generic [ref=f2e15]: 
            - text: Home
        - listitem [ref=f2e16]:
          - link " Products" [ref=f2e17] [cursor=pointer]:
            - /url: /products
            - generic [ref=f2e18]: 
            - text: Products
        - listitem [ref=f2e19]:
          - link " Cart" [ref=f2e20] [cursor=pointer]:
            - /url: /view_cart
            - generic [ref=f2e21]: 
            - text: Cart
        - listitem [ref=f2e22]:
          - link " Signup / Login" [ref=f2e23] [cursor=pointer]:
            - /url: /login
            - generic [ref=f2e24]: 
            - text: Signup / Login
        - listitem [ref=f2e25]:
          - link " Test Cases" [ref=f2e26] [cursor=pointer]:
            - /url: /test_cases
            - generic [ref=f2e27]: 
            - text: Test Cases
        - listitem [ref=f2e28]:
          - link " API Testing" [ref=f2e29] [cursor=pointer]:
            - /url: /api_list
            - generic [ref=f2e30]: 
            - text: API Testing
        - listitem [ref=f2e31]:
          - link " Video Tutorials" [ref=f2e32] [cursor=pointer]:
            - /url: https://www.youtube.com/c/AutomationExercise
            - generic [ref=f2e33]: 
            - text: Video Tutorials
        - listitem [ref=f2e34]:
          - link " Contact us" [ref=f2e35] [cursor=pointer]:
            - /url: /contact_us
            - generic [ref=f2e36]: 
            - text: Contact us
  - generic [ref=f2e37]:
    - heading [level=2] [ref=f2e41]:
      - text: Contact
      - strong [ref=f2e42]: Us
    - generic [ref=f2e43]:
      - generic [ref=f2e45]:
        - generic [ref=f2e46]: "Note: Below contact form is for testing purpose."
        - heading "Get In Touch" [level=2] [ref=f2e47]
        - generic [ref=f2e49]:
          - textbox "Name" [ref=f2e51]
          - textbox "Email" [active] [ref=f2e53]
          - textbox "Subject" [ref=f2e55]
          - textbox "Your Message Here" [ref=f2e57]
          - button "Choose File" [ref=f2e59]
          - button "Submit" [ref=f2e61] [cursor=pointer]
      - generic [ref=f2e63]:
        - heading "Feedback For Us" [level=2] [ref=f2e64]
        - generic [ref=f2e65]:
          - paragraph [ref=f2e66]: We really appreciate your response to our website.
          - paragraph [ref=f2e67]:
            - text: Kindly share your feedback with us at
            - link "feedback@automationexercise.com" [ref=f2e68] [cursor=pointer]:
              - /url: mailto:feedback@automationexercise.com
            - text: .
          - paragraph [ref=f2e69]: If you have any suggestion areas or improvements, do let us know. We will definitely work on it.
          - paragraph [ref=f2e70]: Thank you
  - contentinfo [ref=f2e71]:
    - generic [ref=f2e76]:
      - heading "Subscription" [level=2] [ref=f2e77]
      - generic [ref=f2e78]:
        - textbox "Your email address" [ref=f2e79]
        - button "" [ref=f2e80] [cursor=pointer]
        - paragraph [ref=f2e82]: Get the most recent updates from our site and be updated your self...
    - paragraph [ref=f2e86]: Copyright © 2021 All rights reserved
  - text: 
```

# Test source

```ts
  1  | // import { test, expect } from '@playwright/test';
  2  | import { test, expect } from '../test-data/fixtures.js';
  3  | import path from 'path';
  4  | import { fileURLToPath } from 'url';
  5  | import HomePage from '../pages/homePage.js';
  6  | import ContactPage from '../pages/contactPage.js';
  7  | 
  8  | // Create __dirname equivalent for ES modules
  9  | const __filename = fileURLToPath(import.meta.url);
  10 | const __dirname = path.dirname(__filename)
  11 | 
  12 | test.describe('Contact Us Form', () => {
  13 |   test('Test Case 6: Submit the Contact Us form', async ({ page }) => {
  14 |     const homePage = new HomePage(page);
  15 |     const contactPage = new ContactPage(page);
  16 | 
  17 |     await homePage.goto();
  18 |     await expect(page).toHaveTitle('Automation Exercise');
  19 | 
  20 |     await homePage.goToContactUs();
  21 |     await expect(page.locator('h2', { hasText: 'Get In Touch' })).toBeVisible();
  22 | 
  23 |     const filePath = path.join(__dirname, '../test-data/testFile.txt');
  24 |     
  25 |     await contactPage.fillContactForm(
  26 |       "nour",
  27 |       "nour1@gmail.com",
  28 |       "Subject",
  29 |       "Test Message",
  30 |       filePath
  31 |     );
  32 | 
  33 | 
  34 |     await contactPage.submitForm();
  35 |     await contactPage.submitForm();
  36 | 
  37 |     console.log('URL after submit:', page.url());
  38 |     const bodyText = await page.locator('body').innerText();
  39 |     console.log('Contains "Success"?', bodyText.includes('Success'));
  40 |     console.log('Contains "submitted"?', bodyText.includes('submitted'));
  41 |     
  42 |     await page.screenshot({ path: 'debug-contact-submit.png', fullPage: true });
  43 |     
> 44 |     await contactPage.homeButton.click();
     |                                  ^ Error: locator.click: Test timeout of 30000ms exceeded.
  45 |     await contactPage.homeButton.click();
  46 |   });
  47 | });
  48 | 
```