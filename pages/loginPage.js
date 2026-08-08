
class LoginPage {
    
    constructor(page) {
        this.page = page;

        this.login        = page.locator('a[href="/login"]');
        // Sign Up
        this.signupName   = page.locator('input[data-qa="signup-name"]');
        this.signupEmail  = page.locator('input[data-qa=signup-email]');
        this.signupButton = page.locator('button[data-qa=signup-button]');
        this.SignUpHeading = page.getByText('ENTER ACCOUNT INFORMATION');

        // Login
        this.LoginEmail   = page.locator('input[data-qa="login-email"]');
        this.loginPassword = page.locator('input[data-qa="login-password"]');
        this.loginButton   = page.locator('button[data-qa="login-button"]');
        this.loggedIn      = page.locator('a', { hasText: 'Logged in as' });
        this.loginErrorMsg = page.locator('p', { hasText: 'Email Address already exist!' });
    }

    async goToLogin() {
        await this.login.click();
    }

    async fillSignupForm(name, email) {
        await this.signupName.fill(name);
        await this.signupEmail.fill(email);
        await this.signupButton.click();
    }

    async fillLoginForm(email, password) {
        await this.LoginEmail.fill(email);
        await this.loginPassword.fill(password);
        await this.loginButton.click();
    }
}

export default LoginPage;
