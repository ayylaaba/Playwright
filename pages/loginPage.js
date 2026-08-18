class LoginPage {
  constructor(page) {
    this.page = page;

    // Sign Up (mini form)
    this.signupName = page.locator('input[data-qa="signup-name"]');
    this.signupEmail = page.locator('input[data-qa="signup-email"]');
    this.signupButton = page.locator('button[data-qa="signup-button"]');
    this.signUpHeading = page.getByText('ENTER ACCOUNT INFORMATION');
    this.signUpErrorMsg = page.locator('p', { hasText: 'Email Address already exist!' });

    // Login
    this.loginEmail = page.locator('input[data-qa="login-email"]');
    this.loginPassword = page.locator('input[data-qa="login-password"]');
    this.loginButton = page.locator('button[data-qa="login-button"]');
    this.loginErrorMsg = page.locator('p', { hasText: 'Your email or password is incorrect!' });
  }

  async fillSignupForm(name, email) {
    await this.signupName.fill(name);
    await this.signupEmail.fill(email);
    await this.signupButton.click();
  }

  async fillLoginForm(email, password) {
    await this.loginEmail.fill(email);
    await this.loginPassword.fill(password);
    await this.loginButton.click();
  }
}

export default LoginPage;
