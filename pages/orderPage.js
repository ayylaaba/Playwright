class OrderPage 
{
    constructor (page) {

        this.page = page;
        
        this.proceedCheckout = page.locator('.check_out');
        
        this.addressDeatails = page.getByText('Address Details');
        this.reviewOrderHeading = page.getByText('Review Your Order');
        this.orderComment = page.locator('.form-control');
        this.placeOrder = page.locator('a[href="/payment"]');

        // 
        this.headingPayment = page.getByRole('heading', { name: 'Payment' });
        this.nameCard = page.locator('input[data-qa="name-on-card"]');
        this.cardNumber = page.locator('input[data-qa="card-number"]');
        this.cvc = page.locator('input[data-qa="cvc"]');
        this.expirationMonth = page.locator('input[data-qa="expiry-month"]');
        this.expirationYear = page.locator('input[data-qa="expiry-year"]');

        this.confirmOrder = page.getByRole('button', { name: 'Pay and Confirm Order' });
                
        // "Register / Login" link inside the checkout modal (shown if not logged in)
        this.registerButton = page.getByRole('link', { name: 'Register / Login' });
        
    }
    async proceedToCheckout() {
        await this.proceedCheckout.click();
    }
    async placeOrderClick(){
        await this.placeOrder.click();
    }

    async fillPaymentForm (nameCard, cardNumber, cvc, expirationMonth, expirationYear){

        await this.nameCard.fill(nameCard);
        await this.cardNumber.fill(cardNumber);
        await this.cvc.fill(cvc);
        await this.expirationMonth.fill(expirationMonth);
        await this.expirationYear.fill(expirationYear);
    }

    async confirmOrderButton(){
        await this.confirmOrder.click(); 
    }

}

export default  OrderPage;
