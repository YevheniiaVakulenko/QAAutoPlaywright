import { Page, Locator } from "@playwright/test";
import { RegisterForm } from "./RegisterForm";

export class LogInForm {
  private page: Page;
  private openRegisterForm: Locator;
  private dialog: Locator;
  private emailInput: Locator;
  private passwordInput:Locator;
  private logInButton:Locator;
  constructor(page: Page) {
    this.page = page;
    this.dialog = page.getByRole('dialog');
    this.openRegisterForm = page.getByRole('button', { name: 'Registration' });
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.logInButton = page.getByRole('button', { name: 'Login' });
  }

  async isDialogVisible(){
    return await this.dialog.isVisible();
  }

  async openRegisterFormDialog(){
    await this.openRegisterForm.click();
    return new RegisterForm (this.page)
  }

  async Login(email, pass){
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);
    await this.logInButton.click();
  }
}