import { Page, Locator, expect } from "@playwright/test";

export class RegisterForm {
  private page: Page;
  private dialog: Locator;
  private nameInput: Locator;
  private lastNameInput: Locator;
  private emailInput: Locator;
  private passwordInput: Locator;
  private repeatPasswordInput: Locator;
  private registerButton: Locator;
  private passwordMatch : Locator;

  constructor(page: Page) {
    this.page = page;
    this.dialog = page.getByRole('dialog');
    this.nameInput = page.locator('#signupName');
    this.lastNameInput = page.locator('#signupLastName');
    this.emailInput = page.getByRole('textbox', { name: 'Name Last name Email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password', exact: true });
    this.repeatPasswordInput = page.getByRole('textbox', { name: 'Re-enter password' });
    this.registerButton = page.getByRole('button', { name: 'Register' });
    this.passwordMatch = page.getByText('Passwords do not match');;
  }

    async fillRegistrationForm(name, lastName, email, password, repassword) {
        await this.nameInput.fill(name);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.repeatPasswordInput.fill(repassword);
        await this.page.click('body');
    }

    async submitRegistration() {
        await this.registerButton.click();
    }

    async isRegButtonDisabled() {
        return await this.registerButton.isDisabled();
    }

    async isPasswodMatchMessageVisible() {
        return await this.passwordMatch.isVisible();
    }

    async checkEmpty(inputLocator, message) {
        const input = this.page.locator(inputLocator);
        
        await input.focus();
        await input.blur();
        await expect(this.page.locator(`text=${message}`)).toBeVisible();
        await expect(input).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(this.registerButton).toBeDisabled();
    }

    async checkWrongDataInput(inputLocator, inputData, message) {
        const input = this.page.locator(inputLocator);
        await input.fill(inputData);
        await input.blur();
        await expect(this.page.locator(`text=${message}`)).toBeVisible();
        await expect(input).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(this.registerButton).toBeDisabled();
    }
    async isDialogHidden(){
        await expect(this.dialog).toBeHidden();
    }


}