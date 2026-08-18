class OrderPage {
  constructor(page) {
    this.page = page;

    this.proceedCheckout = page.locator('.check_out');
    this.addressDetails = page.getByText('Address Details');
    this.reviewOrderHeading = page.getByText('Review Your Order');
    this.orderComment = page.locator('.form-control');
    this.placeOrder = page.locator('a[href="/payment"]');

    this.headingPayment = page.getByRole('heading', { name: 'Payment' });
    this.nameCard = page.locator('input[data-qa="name-on-card"]');
    this.cardNumber = page.locator('input[data-qa="card-number"]');
    this.cvc = page.locator('input[data-qa="cvc"]');
    this.expirationMonth = page.locator('input[data-qa="expiry-month"]');
    this.expirationYear = page.locator('input[data-qa="expiry-year"]');
    this.confirmOrder = page.getByRole('button', { name: 'Pay and Confirm Order' });

    this.registerButton = page.getByRole('link', { name: 'Register / Login' });

    this.downloadButton = page.locator('a', { hasText: 'Download Invoice' });
    this.continueButton = page.locator('a', { hasText: 'Continue' });

    // Delivery address
    this.verifyDeliveryAddressTitle = page.locator('#address_delivery h3');
    this.verifyDeliveryFullName = page.locator('#address_delivery .address_firstname.address_lastname');
    
    this.verifyDeliveryAdd1 = page.locator('#address_delivery .address_address1.address_address2').nth(0);
    this.verifyDeliveryAdd2 = page.locator('#address_delivery .address_address1.address_address2').nth(1);

    this.verifyDeliveryStateCityPostal = page.locator('#address_delivery .address_city.address_state_name.address_postcode');
    this.verifyDeliveryCountry = page.locator('#address_delivery .address_country_name');
    this.verifyDeliveryPhone = page.locator('#address_delivery .address_phone');

    // Billing address
    this.verifyBillingAddressTitle = page.locator('#address_invoice h3');
    this.verifyBillingFullName = page.locator('#address_invoice .address_firstname.address_lastname');
    this.verifyBillingAdd1 = page.locator('#address_invoice .address_address1.address_address2').nth(0);
    this.verifyBillingAdd2 = page.locator('#address_invoice .address_address1.address_address2').nth(1);
    this.verifyBillingCityPostal = page.locator('#address_invoice .address_city.address_state_name.address_postcode');
    this.verifyBillingCountry = page.locator('#address_invoice .address_country_name');
    this.verifyBillingPhone = page.locator('#address_invoice .address_phone');
  }

  async proceedToCheckout() {
    await this.proceedCheckout.click();
  }

  async placeOrderClick() {
    await this.placeOrder.click();
  }

  async fillPaymentForm(nameCard, cardNumber, cvc, expirationMonth, expirationYear) {
    await this.nameCard.fill(nameCard);
    await this.cardNumber.fill(cardNumber);
    await this.cvc.fill(cvc);
    await this.expirationMonth.fill(expirationMonth);
    await this.expirationYear.fill(expirationYear);
  }

  async confirmOrderButton() {
    await this.confirmOrder.click();
  }

  async downloadInvoice() {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.downloadButton.click(),
    ]);
    return download;
  }
}

export default OrderPage;
