
class HomePage {
    constructor(page) {
        this.page = page;
        this.loginLink =    page.locator('a[href="/login"]');
        this.productsLink = page.locator('a[href="/products"]');
        this.contactUsLink = page.locator('a[href="/contact_us"]');
        this.testCasesLink = page.getByRole('link', { name: 'Test Cases', exact: true });
        this.cartLink      = page.getByRole('link', { name: 'Cart' });
        this.loggedInAsText = page.locator('a', { hasText: 'Logged in as' });
        this.logoutLink = page.locator('a[href="/logout"]');
        this.deleteAccountLink = page.locator('a[href="/delete_account"]');
        // this.deletedMessa
    }

    async goto() {
        await this.page.goto('https://automationexercise.com/');
    }

    async goToCart() {

        await this.cartLink.click();
    }

    async goToLogin() {

        await this.loginLink.click();
    }

    async goToProducts() {
        await this.productsLink.click();
    }

    async goToContactUs() {
        await this.contactUsLink.click();
    }
    
    async goToTestCases() {
        await this.testCasesLink.click();
    }
    
    async logout() {
        await this.logoutLink.click();
    }
    
    async deleteAccount() {
        await this.deleteAccountLink.click();
    }
}

export default HomePage;
