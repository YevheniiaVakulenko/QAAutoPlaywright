import { test as setup} from '@playwright/test';
import { HomePage } from "../POM/HomePage";

const authFile = './utils/storageState.json'
setup('Setup: Login and save storage state', async ({page}) => {
    const projectName = process.env.BASE_PROJECT_NAME;

    const email = projectName === 'NORM'
      ? process.env.EMAIL_NORM
      : process.env.EMAIL_BUG;

    const pass = projectName === 'NORM'
      ? process.env.PASS_NORM
      : process.env.PASS_BUG;

    const url = projectName === 'NORM'
      ? process.env.BASEURL_NORM!
      : process.env.BASEURL_BUG!;

    await page.goto(url);
    const homePage = new HomePage(page);
    const loginPage = await homePage.openLogInFormDialog();
    await loginPage.Login(email,pass);

    await page.waitForURL(`${url}/panel/garage`);

    await page.context().storageState({ path: authFile });
});
