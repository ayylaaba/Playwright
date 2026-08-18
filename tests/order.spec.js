// import { test, expect } from '@playwright/test';
import { test, expect } from '../test-data/fixtures.js';
import HomePage from '../pages/homePage.js';
import ProductPage from '../pages/productPage.js';
import OrderPage from '../pages/orderPage.js';
import LoginPage from '../pages/loginPage.js';
import SignupPage from '../pages/signupPage.js';
import registerUser from '../test-data/registerUser.js';
import generateTestUser from '../test-data/testUser.js';

test.describe('Place Order Flows', () => {
  test('Test Case 14: Place Order: Register while Checkout', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const orderPage = new OrderPage(page);
    const loginPage = new LoginPage(page);
    const signupPage = new SignupPage(page);
    const user = generateTestUser();

    await homePage.goto();
    await expect(page).toHaveTitle('Automation Exercise');

    await homePage.goToProducts();
    await productPage.addProductToCart(0);
    await productPage.clickContinueShopping();

    await homePage.goToCart();
    await expect(page).toHaveTitle('Automation Exercise - Checkout');

    await orderPage.proceedToCheckout();
    await orderPage.registerButton.click();

    await expect(page.getByText('New User Signup!')).toBeVisible();
    await loginPage.fillSignupForm(user.name, user.email);

    await expect(signupPage.signUpHeading).toBeVisible();
    await signupPage.fillAccountInformation(user.password);
    await signupPage.fillAddressInformation({ firstName: 'nour', lastName: 'hafdi' });
    await signupPage.submitForm();

    await expect(signupPage.createdMessage).toBeVisible();
    await signupPage.clickContinueButton();
    await expect(homePage.loggedInAsText).toContainText(user.name);

    await homePage.goToCart();
    await orderPage.proceedToCheckout();
    await expect(orderPage.addressDetails).toBeVisible();
    await expect(orderPage.reviewOrderHeading).toBeVisible();

    await orderPage.orderComment.fill('Test order comment');
    await orderPage.placeOrderClick();

    await expect(orderPage.headingPayment).toBeVisible();
    await orderPage.fillPaymentForm('John', '1234567890123456', '432', '08', '2028');
    await orderPage.confirmOrderButton();

    await expect(page.getByText('Congratulations! Your order has been confirmed!')).toBeVisible();

    await homePage.deleteAccount();
    await expect(page.getByText('ACCOUNT DELETED!')).toBeVisible();
    await page.getByRole('link', { name: 'Continue' }).click();
  });

  test('Test Case 15: Place Order: Register before Checkout', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const orderPage = new OrderPage(page);

    const user = await registerUser(page);
    await expect(homePage.loggedInAsText).toContainText(user.name);

    await homePage.goToProducts();
    await productPage.addProductToCart(0);
    await productPage.clickContinueShopping();
    await productPage.addProductToCart(1);
    await productPage.clickContinueShopping();

    await homePage.goToCart();
    await expect(page).toHaveTitle('Automation Exercise - Checkout');

    await orderPage.proceedToCheckout();
    await expect( orderPage.addressDetails).toBeVisible();
    await expect( orderPage.reviewOrderHeading).toBeVisible();

    await orderPage.orderComment.fill('Test order comment');
    await orderPage.placeOrderClick();

    await orderPage.fillPaymentForm('cih', '0349233423', '234', '10', '2027');
    await orderPage.confirmOrderButton();
    await expect(page.getByText('Congratulations! Your order has been confirmed!')).toBeVisible();

    await homePage.deleteAccount();
    await expect(page.getByText('ACCOUNT DELETED!')).toBeVisible();
    await page.getByRole('link', { name: 'Continue' }).click();
  });

  test('Test Case 16: Place Order: Login before Checkout', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const orderPage = new OrderPage(page);
    const loginPage = new LoginPage(page);

    const user = await registerUser(page);
    await homePage.logout();

    await homePage.goToLogin();
    await loginPage.fillLoginForm(user.email, user.password);
    await expect(homePage.loggedInAsText).toContainText(user.name);

    await homePage.goToProducts();
    await productPage.addProductToCart(0);
    await productPage.clickContinueShopping();
    await productPage.addProductToCart(1);
    await productPage.clickContinueShopping();

    await homePage.goToCart();
    await expect(page).toHaveTitle('Automation Exercise - Checkout');

    await orderPage.proceedToCheckout();
    await expect(orderPage.addressDetails).toBeVisible();
    await expect(orderPage.reviewOrderHeading).toBeVisible();

    await orderPage.orderComment.fill('Test order comment');
    await orderPage.placeOrderClick();

    await expect(orderPage.headingPayment).toBeVisible();
    await orderPage.fillPaymentForm('Cih', '012345678', '320', '07', '2026');
    await orderPage.confirmOrderButton();

    await expect(page.getByText('Congratulations! Your order has been confirmed!')).toBeVisible();

    await homePage.deleteAccount();
    await expect(page.getByText('ACCOUNT DELETED!')).toBeVisible();
    await page.getByRole('link', { name: 'Continue' }).click();
  });

  test('Test Case 23: Verify address details in checkout page', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const orderPage = new OrderPage(page);

    await homePage.goto();
    await expect(page).toHaveTitle('Automation Exercise');

    const user = await registerUser(page);
    await expect(homePage.loggedInAsText).toContainText(user.name);

    await homePage.goToProducts();
    await productPage.addProductToCart(1);
    await productPage.clickContinueShopping();

    await homePage.goToCart();
    await expect(page).toHaveTitle('Automation Exercise - Checkout');

    await orderPage.proceedToCheckout();

    // Delivery
    await expect(orderPage.verifyDeliveryAddressTitle).toContainText('Your delivery address');
    await expect(orderPage.verifyDeliveryFullName).toContainText('nour hafdi');
    await expect(orderPage.verifyDeliveryCountry).toContainText('United States');
    await expect(orderPage.verifyDeliveryStateCityPostal).toContainText('Los Angeles California 90001');
    await expect(orderPage.verifyDeliveryPhone).toContainText('1234567890');
    await expect(orderPage.verifyDeliveryAdd1).toContainText('MyCompany');
    await expect(orderPage.verifyDeliveryAdd2).toContainText('123 Main St');

    // Billing
    await expect(orderPage.verifyBillingAddressTitle).toContainText('Your billing address');
    await expect(orderPage.verifyBillingFullName).toContainText('nour hafdi');
    await expect(orderPage.verifyBillingCountry).toContainText('United States');
    await expect(orderPage.verifyBillingCityPostal).toContainText('Los Angeles California 90001');
    await expect(orderPage.verifyBillingPhone).toContainText('1234567890');
    await expect(orderPage.verifyBillingAdd1).toContainText('MyCompany');
    await expect(orderPage.verifyBillingAdd2).toContainText('123 Main St');
  });

  test('Test Case 24: Download Invoice after purchase order', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const orderPage = new OrderPage(page);

    const user = await registerUser(page);
    await expect(homePage.loggedInAsText).toContainText(user.name);

    await homePage.goToProducts();
    await productPage.addProductToCart(1);
    await productPage.clickContinueShopping();

    await homePage.goToCart();
    await expect(page).toHaveTitle('Automation Exercise - Checkout');

    await orderPage.proceedToCheckout();
    await expect(orderPage.addressDetails).toBeVisible();
    await expect(orderPage.reviewOrderHeading).toBeVisible();

    await orderPage.orderComment.fill('Comfortable product');
    await orderPage.placeOrderClick();
    await orderPage.fillPaymentForm('cih', '09342312345', '123', '03', '2029');
    await orderPage.confirmOrderButton();

    await expect(page.getByText('Congratulations! Your order has been confirmed!')).toBeVisible();

    const download = await orderPage.downloadInvoice();
    expect(download.suggestedFilename()).toMatch(/invoice/i);
    const downloadPath = await download.path();
    expect(downloadPath).not.toBeNull();

    await orderPage.continueButton.click();

    await homePage.deleteAccount();
    await expect(page.getByText('ACCOUNT DELETED!')).toBeVisible();
  });
});
