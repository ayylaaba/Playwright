
class ContactPage {

    constructor(page) {
        this.page = page;
        this.nameInput = page.locator('input[data-qa="name"]');
        this.emailInput = page.locator('input[data-qa="email"]');
        this.subjectInput = page.locator('input[data-qa="subject"]');
        this.messageTextarea = page.locator('textarea[data-qa="message"]');
        this.uploadFileInput = page.locator('input[name="upload_file"]');;
        this.submitButton = page.locator('input[data-qa="submit-button"]');
        this.successMessage = page.locator('#contact-page').getByText(
            'Success! Your details have been submitted successfully.'
          );
        this.homeButton = page.getByRole('link', { name: 'Home' });    }

    async fillContactForm(name, email, subject, message, filePath) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.subjectInput.fill(subject);
        await this.messageTextarea.fill(message);
        console.log('filePath : ', filePath);
        await this.uploadFileInput.setInputFiles(filePath);
    }

    async submitForm() {
        this.page.on('dialog', async (dialog) => {
          await dialog.accept();
        });
      
        await Promise.all([
          this.page.waitForNavigation(),
          this.submitButton.click(),
        ]);
      }

}

export default ContactPage;
