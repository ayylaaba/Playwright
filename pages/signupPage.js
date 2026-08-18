class SignupPage {
  constructor(page) {
    this.page = page;

    this.signUpHeading = page.getByText('ENTER ACCOUNT INFORMATION');

    // Account Information
    this.radioMr = page.locator('input[id="id_gender1"]');
    this.radioMrs = page.locator('input[id="id_gender2"]');
    this.password = page.locator('input[data-qa="password"]');
    this.days = page.locator('select[id="days"]');
    this.months = page.locator('select[id="months"]');
    this.years = page.locator('select[id="years"]');
    this.newsletter = page.locator('input[id="newsletter"]');
    this.specialOffers = page.locator('input[id="optin"]');

    // Address Information
    this.firstName = page.locator('input[id="first_name"]');
    this.lastName = page.locator('input[id="last_name"]');
    this.company = page.locator('input[id="company"]');
    this.address1 = page.locator('input[id="address1"]');
    this.address2 = page.locator('input[id="address2"]');
    this.country = page.locator('select[id="country"]');
    this.state = page.locator('input[id="state"]');
    this.city = page.locator('input[id="city"]');
    this.zipcode = page.locator('input[id="zipcode"]');
    this.mobileNumber = page.locator('input[id="mobile_number"]');

    this.createAccountButton = page.locator('button[data-qa="create-account"]');
    this.createdMessage = page.locator('h2[data-qa="account-created"]');
    this.continueButton = page.locator('a[data-qa="continue-button"]');
    this.verifyAccountDeleted = page.locator('h2[data-qa="account-deleted"]');
  }

  async fillAccountInformation(password, day = '10', month = 'January', year = '1990') {
    await this.radioMr.click();
    await this.password.fill(password);
    await this.days.selectOption(day);
    await this.months.selectOption(month);
    await this.years.selectOption(year);
    await this.newsletter.click();
    await this.specialOffers.click();
  }

  async fillAddressInformation({
    firstName, lastName, company = 'MyCompany', address = '123 Main St',
    address2 = '', country = 'United States', state = 'California',
    city = 'Los Angeles', zipcode = '90001', mobileNumber = '1234567890',
  }) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.company.fill(company);
    await this.address1.fill(address);
    if (address2) await this.address2.fill(address2);
    await this.country.selectOption(country);
    await this.state.fill(state);
    await this.city.fill(city);
    await this.zipcode.fill(zipcode);
    await this.mobileNumber.fill(mobileNumber);
  }

  async submitForm() {
    await this.createAccountButton.click();
  }

  async clickContinueButton() {
    await this.continueButton.click();
  }
}

export default SignupPage;
