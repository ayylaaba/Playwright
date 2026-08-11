import {test, expect} from '@playwright/test'
import HomePage from "../pages/homePage";
import ProductPage from '../pages/productPage';
import OrderPage from '../pages/orderPage'
import SignpPage from '../pages/signpPage';
import registerUser from '../test-data/registerUser.js';
import LoginPage from '../pages/loginPage.js';
import CartPage from '../pages/cartPage.js';


test.describe('Test Case 14: Place Order: Register while Checkout', () => {
    
    // test('Test Case 14: Place Order: Register while Checkout ', async({page}) => {
        
    //     const homePage = new HomePage(page);
    //     const productPage = new ProductPage(page);
    //     const orderPage = new OrderPage(page);
    //     const signupPage = new SignpPage(page);

    //     await homePage.goto();
    //     await expect(page).toHaveTitle('Automation Exercise');

    //     // 
    //     await homePage.goToProducts();
    //     await productPage.addProductToCart(0);
    //     await productPage.continueShoppingButton.click();

    //     //
    //     await homePage.goToCart();
    //     await expect(page).toHaveTitle('Automation Exercise - Checkout');

    //     //
    //     await orderPage.proceedCheckout.click();

    //     // 
    //     await orderPage.registerButton.click();

    //     // Signup
    //     const user =  await registerUser(page);

    //     await expect(signupPage.userLoggedsuccefuly).toContainText(user.name);
        


    //     // cart button
    //     await homePage.goToCart();
    //     await orderPage.proceedToCheckout();

    //     await expect(orderPage.addressDeatails).toBeVisible();
    //     await expect(orderPage.reviewOrderHeading).toBeVisible();

    //     // // 15. Enter description in comment text area and click 'Place Order'
    //     await orderPage.orderComment.fill('text area left comment');
    //     await orderPage.placeOrder.click();

    //     await expect(orderPage.headingPayment).toBeVisible();

    //     // // FILL INFO ORDER
    //     await orderPage.nameCard.fill('jhon');
    //     await orderPage.cardNumber.fill('123456789');
    //     await orderPage.cvc.fill('432');
    //     await orderPage.expirationMonth.fill('08');
    //     await orderPage.expirationYear.fill('2008');
    //     await orderPage.confirmOrder.click();

    //     // Assert the ACTUAL success text on this site
    //     await expect(page.getByText('Congratulations! Your order has been confirmed!')).toBeVisible();
        
    //     await homePage.deleteAccount();
    //     await expect(page.getByText('ACCOUNT DELETED!')).toBeVisible();
    //     await page.getByRole('link', { name: 'Continue' }).click();
    
    // })

    // test('Test Case 15: Place Order: Register before Checkout ', async({page}) => {
    //     const homePage = new HomePage(page);
    //     const productPage = new ProductPage(page);
    //     const orderPage = new OrderPage(page);
    //     const signupPage = new SignpPage(page);

    //     const user = await registerUser(page);

    //     await expect(homePage.loggedInAsText).toContainText(user.name);

    //     await productPage.addProductToCart(0);
    //     await productPage.addProductToCart(1);

    //     await homePage.goToCart();
    //     await expect(page).toHaveTitle('Automation Exercise - Checkout');

    //     await orderPage.proceedCheckout.click();
    //     await expect(orderPage.addressDeatails).toBeVisible();
    //     await expect(orderPage.reviewOrderHeading).toBeVisible();

    //     await orderPage.orderComment.fill('dasdasdas');
    //     await orderPage.placeOrder.click();

    //     await orderPage.nameCard.fill('cih');
    //     await orderPage.cardNumber.fill('0349233423');
    //     await orderPage.cvc.fill('234');
    //     await orderPage.expirationMonth.fill('10');
    //     await orderPage.expirationYear.fill('2027');

    //     await orderPage.confirmOrder.click();
    //     await expect(page.getByText('Congratulations! Your order has been confirmed!')).toBeVisible();

    //     await homePage.deleteAccount()
    //     await expect(page.getByText('ACCOUNT DELETED!')).toBeVisible();
    //     await page.getByRole('link', { name: 'Continue' }).click();
    // });

    test('Test Case 16: Place Order: Login before Checkout', async({page}) => {
        const homePage = new HomePage(page);
        const productPage = new ProductPage(page);
        const orderPage = new OrderPage(page);
        const signupPage = new SignpPage(page);
        const loginPage = new LoginPage(page);
        const cartPage = new CartPage(page);
        
        const user = await registerUser(page);
        
        console.log(`email : ${user.email}, password : ${user.password}`);

        await homePage.logout();
        
        await homePage.goToLogin();

        await loginPage.fillLoginForm(user.email, user.password);

        await expect(homePage.loggedInAsText).toContainText(user.name);
    
        await productPage.addProductToCart(0);
        await productPage.addProductToCart(1);
        await homePage.goToCart();

        await expect(page).toHaveTitle('Automation Exercise - Checkout');

        await orderPage.proceedToCheckout();

        await expect(orderPage.addressDeatails).toBeVisible();
        await expect(orderPage.reviewOrderHeading).toBeVisible();

        await orderPage.orderComment.fill('losdasd asdasd as das das');
        await orderPage.placeOrderClick();

        await expect(orderPage.headingPayment).toBeVisible();
    
        await orderPage.fillPaymentForm('Cih', '012345678','320','07','2026');
        await orderPage.confirmOrderButton();
        
        await expect(page.getByText('Congratulations! Your order has been confirmed!')).toBeVisible();
        
        await homePage.deleteAccount();
        await expect(page.getByText('ACCOUNT DELETED!')).toBeVisible();
        await page.getByRole('link', { name: 'Continue' }).click();
    })
});




