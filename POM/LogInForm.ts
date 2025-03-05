import { Page, Locator } from "@playwright/test";
import { RegisterForm } from "./RegisterForm";

export class LogInForm {
  private page: Page;
  private openRegisterForm: Locator;
  private dialog: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dialog = page.getByRole('dialog');
    this.openRegisterForm = page.getByRole('button', { name: 'Registration' });
  }

  async isDialogVisible(){
    return await this.dialog.isVisible();
  }

  async openRegisterFormDialog(){
    await this.openRegisterForm.click();
    return new RegisterForm (this.page)
  }
}