import { test, expect } from '@playwright/test';
import { HomePage } from "../POM/HomePage";
const email = `aqa+${Date.now()}@gmail.com`;
let registerPage;
test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const homePage = new HomePage(page);
    const loginPage = await homePage.openLogInFormDialog();
    registerPage = await loginPage.openRegisterFormDialog();
  });

test.describe('Successful Register', () => {
    test('Successful Register', async ()=>{
        await registerPage.fillRegistrationForm('aaa', 'aaa', email, 'Password1', 'Password1');
        await registerPage.submitRegistration();
        await registerPage.isDialogHidden();
    })
});

test.describe('Empty input validation', () => {
    test('Check Empty Name', async () => {
        await registerPage.checkEmpty('#signupName', 'Name required');
    });

    test('Check Empty Last Name', async () => {
        await registerPage.checkEmpty('#signupLastName', 'Last name required');
    });

    test('Check Empty Email', async () => {
        await registerPage.checkEmpty( '#signupEmail', 'Email required');
    });

    test('Check Empty Password', async () => {
        await registerPage.checkEmpty( '#signupPassword', 'Password required');
    });

    test('Check Empty Re-enter password', async () => {
        await registerPage.checkEmpty( '#signupRepeatPassword', 'Re-enter password required');
    });

});

test.describe('Wrong Data Name input', () => {
    test('Check Name length less that 2', async () => {
        await registerPage.checkWrongDataInput( '#signupName','a' ,'Name has to be from 2 to 20 characters long');
    });
    test('Check Name length more that 20', async () =>{
        await registerPage.checkWrongDataInput( '#signupName','aaaaaaaaaaaaaaaaaaaaa' ,'Name has to be from 2 to 20 characters long');
    });
    test('Check Name with numbers', async () => {
        await registerPage.checkWrongDataInput( '#signupName','a1' ,'Name is invalid');
    });
    test('Check Name with special characters', async () => {
        await registerPage.checkWrongDataInput( '#signupName','a&' ,'Name is invalid');
    });
});

test.describe('Wrong Data Last Name input', () => {
    test('Check Last Name length less that 2', async () => {
        await registerPage.checkWrongDataInput('#signupLastName','a' ,'Last name has to be from 2 to 20 characters long');
    });
    test('Check Last Name length more that 20', async () => {
        await registerPage.checkWrongDataInput('#signupLastName','aaaaaaaaaaaaaaaaaaaaa' ,'Last name has to be from 2 to 20 characters long');
    });
    test('Check Last Name with numbers', async () => {
        await registerPage.checkWrongDataInput('#signupLastName','a1' ,'Last name is invalid');
    });
    test('Check Last Name with special characters', async () => {
        await registerPage.checkWrongDataInput('#signupLastName','a&' ,'Last name is invalid');
    });
});

test.describe('Wrong Data Email input', () => {
    test('Check Email without @', async () => {
        await registerPage.checkWrongDataInput('#signupEmail','johnexample.com' ,'Email is incorrect');
    });
    test('Check Email without domain', async () => {
        await registerPage.checkWrongDataInput('#signupEmail','john@.com' ,'Email is incorrect');
    });
    test('Check Email without .com', async () => {
        await registerPage.checkWrongDataInput('#signupEmail','john@example' ,'Email is incorrect');
    });
});

test.describe('Wrong Data Password input', () => {
    test('Check Password length less that 8', async () => {
        await registerPage.checkWrongDataInput('#signupPassword','aA1bcd' ,'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    });
    test('Check Password length more that 15', async () => {
        await registerPage.checkWrongDataInput('#signupPassword','A1b2c3d4e5f6g7h8i' ,'Password has to be from 8 to 15 characters');
    });
    test('Check Password with numbers only', async () => {
        await registerPage.checkWrongDataInput('#signupPassword','12345678' ,'Password has to be from 8 to 15 characters');
    });
    test('Check Password with characters only', async () => {
        await registerPage.checkWrongDataInput('#signupPassword','aaaaaaaA' ,'Password has to be from 8 to 15 characters');
    });
    test('Check Password with no uppercase letters', async () => {
        await registerPage.checkWrongDataInput('#signupPassword','password1' ,'Password has to be from 8 to 15 characters');
    });
    test('Check Password with no lowercase letters', async () => {
        await registerPage.checkWrongDataInput('#signupPassword','PASSWORD1' ,'Password has to be from 8 to 15 characters');
    });
});

test.describe('Wrong Data Re-enter Password input', () => {
    test('Check Re-enter Password length less that 8', async () => {
        await registerPage.checkWrongDataInput('#signupRepeatPassword','aA1bcd' ,'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    });
    test('Check Re-enter Password length more that 15', async () => {
        await registerPage.checkWrongDataInput('#signupRepeatPassword','A1b2c3d4e5f6g7h8i' ,'Password has to be from 8 to 15 characters');
    });
    test('Check Re-enter Password with numbers only', async () => {
        await registerPage.checkWrongDataInput('#signupRepeatPassword','12345678' ,'Password has to be from 8 to 15 characters');
    });
    test('Check Re-enter Password with characters only', async () => {
        await registerPage.checkWrongDataInput('#signupRepeatPassword','aaaaaaaA' ,'Password has to be from 8 to 15 characters');
    });
    test('Check Re-enter Password with no uppercase letters', async () => {
        await registerPage.checkWrongDataInput('#signupRepeatPassword','password1' ,'Password has to be from 8 to 15 characters');
    });
    test('Check Re-enter Password with no lowercase letters', async () => {
        await registerPage.checkWrongDataInput('#signupRepeatPassword','PASSWORD1' ,'Password has to be from 8 to 15 characters');
    });
    test('Check Re-enter Password not matched with Password', async () => {
        await registerPage.fillRegistrationForm('aaa', 'aaa', email, 'Password1', 'Password2');
        const isDisabled = await registerPage.isRegButtonDisabled();
        await expect(isDisabled).toBeTruthy();
        const messageVisible = await registerPage.isPasswodMatchMessageVisible()
        await expect(messageVisible).toBeTruthy();
    });
});
