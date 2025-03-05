import { Page, Locator } from "@playwright/test";
import { LogInForm} from "./LogInForm";

export class HomePage {
  private page: Page;
  private openLogInForm: Locator;

  constructor(page: Page) {
    this.page = page;
    this.openLogInForm = page.getByRole('button', { name: 'Sign In' });
  }

  async openLogInFormDialog(){
    await this.openLogInForm.click();
    return new LogInForm(this.page);
  }
}