import {test, expect} from '@playwright/test'
import HomePage from "../pages/homePage";
import ProductPage from '../pages/productPage';
import OrderPage from '../pages/orderPage'
import SignpPage from '../pages/signpPage';
import registerUser from '../test-data/registerUser.js';

test.describe('Test Case 14: Place Order: Register while Checkout', () => {
    
    test('Test Case 14: Place Order: Register while Checkout ', async({page}) => {
        
        const homePage = new HomePage(page);
        const productPage = new ProductPage(page);
        const orderPage = new OrderPage(page);
        const signupPage = new SignpPage(page);

        await homePage.goto();
        await expect(page).toHaveTitle('Automation Exercise');

        // 
        await homePage.goToProducts();
        await productPage.addProductToCart(0);
        await productPage.continueShoppingButton.click();

        //
        await homePage.goToCart();
        await expect(page).toHaveTitle('Automation Exercise - Checkout');

        //
        await orderPage.proceedCheckout.click();

        // 
        await orderPage.registerButton.click();

        // Signup
        const user =  await registerUser(page);

        await expect(signupPage.userLoggedsuccefuly).toContainText(user.name);
        


        // cart button
        await homePage.goToCart();
        await orderPage.proceedToCheckout();

        await expect(orderPage.addressDeatails).toBeVisible();
        await expect(orderPage.reviewOrderHeading).toBeVisible();

        // // 15. Enter description in comment text area and click 'Place Order'
        await orderPage.orderComment.fill('text area left comment');
        await orderPage.placeOrder.click();

        await expect(orderPage.headingPayment).toBeVisible();

        // // FILL INFO ORDER
        await orderPage.nameCard.fill('jhon');
        await orderPage.cardNumber.fill('123456789');
        await orderPage.cvc.fill('432');
        await orderPage.expirationMonth.fill('08');
        await orderPage.expirationYear.fill('2008');
        await orderPage.confirmOrder.click();
        
        // Assert the ACTUAL success text on this site
        await expect(page.getByText('Congratulations! Your order has been confirmed!')).toBeVisible();
        
        await homePage.deleteAccount();
        await expect(page.getByText('ACCOUNT DELETED!')).toBeVisible();
        await page.getByRole('link', { name: 'Continue' }).click();
    
    })
});




