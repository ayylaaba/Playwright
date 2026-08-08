import { expect } from "@playwright/test";

class SignpPage 
{
    constructor(page) {

        this.page = page;
        this.SinupName =  page.locator('input[data-qa="signup-name"]');
        this.Email = page.locator('input[data-qa=signup-email]');
        this.SignupName = page.locator('button[data-qa=signup-button]');
        this.SignUpHeading = page.getByText('ENTER ACCOUNT INFORMATION');

        //Enter Account Information
        this.radiomr = page.locator('input[id="id_gender1"]');
        this.radiomrs = page.locator('input[id="id_gender2"]');
        this.password = page.locator('input[data-qa="password"]');
        this.days = page.locator('select[id="days"]');
        this.months = page.locator('select[id="months"]');
        this.years =  page.locator('select[id="years"]');
        this.newsLetter =  page.locator('input[id="newsletter"]');
        this.selectOption = page.locator('input[id="optin"]');
    
        // Address Information
        this.firstname = page.locator('input[id="first_name"]');
        this.lastname = page.locator('input[id="last_name"]');
        this.company = page.locator('input[id="company"]');
        this.add1 = page.locator('input[id="address1"]');
        this.add2 = page.locator('input[id="address2"]');
        this.country = page.locator('select[id="country"]');
        this.state = page.locator('input[id="state"]');
        this.city = page.locator('input[id="city"]');
        this.zipcode = page.locator('input[id="zipcode"]');
        this.numberMobile = page.locator('input[id="mobile_number"]');
        this.createAccount = page.locator('button[data-qa="create-account"]');
        this.CreatedMessage = page.locator('h2[data-qa="account-created"]');
        this.continueButton = page.locator('a[data-qa="continue-button"]');
        this.userLoggedsuccefuly = page.locator('a', { hasText: 'Logged in as' });
        this.verfiyAccountDeleted = page.locator('h2[data-qa="account-deleted"]');
    
    }

    async fillSignupForm(name, email) {
        await this.SinupName.fill(name);
        await this.Email.fill(email);
        await this.SignupName.click();
    }
    
    // Account Information
    async fillAccountInformation(password, day='10' , month='January', year ='1990') {
        await this.radiomr.click();
        await this.password.fill(password);
        await this.days.selectOption(day);
        await this.months.selectOption(month);
        await this.years.selectOption(year);
        await this.newsLetter.click();
        await this.selectOption.click();
    }
    
    // Address Information
    async fillAddressInformation({
        firstName, lastName, company = 'MyCompany', address = '123 Main St',
        address2 = '', country = 'United States', state = 'California',
        city = 'Los Angeles', zipcode = '90001', mobileNumber = '1234567890'
      }) {
        await this.firstname.fill(firstName);
        await this.lastname.fill(lastName);
        await this.company.fill(company);
        await this.add1.fill(address);
        if (this.add2)
             await this.add2.fill(address2);
        await this.country.selectOption(country);
        await this.state.fill(state);
        await this.city.fill(city);
        await this.zipcode.fill(zipcode);
        await this.numberMobile.fill(mobileNumber);
      }

    // Submit the form
    async submitForm() {
        await this.createAccount.click();
    }

    // click on continue button
    async clickContinueButton() {
        await this.continueButton.click();
    }
    
}

export default SignpPage;
