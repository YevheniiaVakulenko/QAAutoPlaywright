import { test, expect } from '@playwright/test';
import { auth, checkEmpty, checkWrongDataInput } from '../utils/commands.spec';
const email = `aqa+${Date.now()}@gmail.com`;

test.beforeEach(async ({ page }) => {
    await auth(page);
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByRole('button', { name: 'Registration' }).click();
  });

test.describe('Successful Register', () => {
    test('Successful Register', async ({ page })=>{
        await page.fill('#signupName', 'PaulPaul');
        await page.fill('#signupLastName', 'PaulPaul');
        await page.fill('#signupEmail', email);
        await page.fill('#signupPassword', 'L234567891l');
        await page.fill('#signupRepeatPassword', 'L234567891l');
    
        await page.getByRole('button', { name: 'Register' }).click();
        await expect(page.getByRole('dialog')).not.toBeVisible();
    })
});

test.describe('Empty input validation', () => {
    test('Check Empty Name', async ({ page }) => {
        await checkEmpty(page, '#signupName', 'Name required');
    });

    test('Check Empty Last Name', async ({ page }) => {
        await checkEmpty(page, '#signupLastName', 'Last name required');
    });

    test('Check Empty Email', async ({ page }) => {
        await checkEmpty(page, '#signupEmail', 'Email required');
    });

    test('Check Empty Password', async ({ page }) => {
        await checkEmpty(page, '#signupPassword', 'Password required');
    });

    test('Check Empty Re-enter password', async ({ page }) => {
        await checkEmpty(page, '#signupRepeatPassword', 'Re-enter password required');
    });

});

test.describe('Wrong Data Name input', () => {
    test('Check Name length less that 2', async ({ page }) => {
        await checkWrongDataInput(page, '#signupName','a' ,'Name has to be from 2 to 20 characters long');
    });
    test('Check Name length more that 20', async ({ page }) =>{
        await checkWrongDataInput(page, '#signupName','aaaaaaaaaaaaaaaaaaaaa' ,'Name has to be from 2 to 20 characters long');
    });
    test('Check Name with numbers', async ({ page }) => {
        await checkWrongDataInput(page, '#signupName','a1' ,'Name is invalid');
    });
    test('Check Name with special characters', async ({ page }) => {
        await checkWrongDataInput(page, '#signupName','a&' ,'Name is invalid');
    });
});

test.describe('Wrong Data Last Name input', () => {
    test('Check Empty Name', async ({ page }) => {
        await checkEmpty(page, '#signupName', 'Name required');
    });
    test('Check Last Name length less that 2', async ({ page }) => {
        await checkWrongDataInput(page,'#signupLastName','a' ,'Last name has to be from 2 to 20 characters long');
    });
    test('Check Last Name length more that 20', async ({ page }) => {
        await checkWrongDataInput(page,'#signupLastName','aaaaaaaaaaaaaaaaaaaaa' ,'Last name has to be from 2 to 20 characters long');
    });
    test('Check Last Name with numbers', async ({ page }) => {
        await checkWrongDataInput(page,'#signupLastName','a1' ,'Last name is invalid');
    });
    test('Check Last Name with special characters', async ({ page }) => {
        await checkWrongDataInput(page,'#signupLastName','a&' ,'Last name is invalid');
    });
});

test.describe('Wrong Data Email input', () => {
    test('Check Email without @', async ({ page }) => {
        await checkWrongDataInput(page,'#signupEmail','johnexample.com' ,'Email is incorrect');
    });
    test('Check Email without domain', async ({ page }) => {
        await checkWrongDataInput(page,'#signupEmail','john@.com' ,'Email is incorrect');
    });
    test('Check Email without .com', async ({ page }) => {
        await checkWrongDataInput(page,'#signupEmail','john@example' ,'Email is incorrect');
    });
});

test.describe('Wrong Data Password input', () => {
    test('Check Password length less that 8', async ({ page }) => {
        await checkWrongDataInput(page,'#signupPassword','aA1bcd' ,'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    });
    test('Check Password length more that 15', async ({ page }) => {
        await checkWrongDataInput(page,'#signupPassword','A1b2c3d4e5f6g7h8i' ,'Password has to be from 8 to 15 characters');
    });
    test('Check Password with numbers only', async ({ page }) => {
        await checkWrongDataInput(page,'#signupPassword','12345678' ,'Password has to be from 8 to 15 characters');
    });
    test('Check Password with characters only', async ({ page }) => {
        await checkWrongDataInput(page,'#signupPassword','aaaaaaaA' ,'Password has to be from 8 to 15 characters');
    });
    test('Check Password with no uppercase letters', async ({ page }) => {
        await checkWrongDataInput(page,'#signupPassword','password1' ,'Password has to be from 8 to 15 characters');
    });
    test('Check Password with no lowercase letters', async ({ page }) => {
        await checkWrongDataInput(page,'#signupPassword','PASSWORD1' ,'Password has to be from 8 to 15 characters');
    });
});

test.describe('Wrong Data Re-enter Password input', () => {
    test('Check Re-enter Password length less that 8', async ({ page }) => {
        await checkWrongDataInput(page,'#signupRepeatPassword','aA1bcd' ,'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    });
    test('Check Re-enter Password length more that 15', async ({ page }) => {
        await checkWrongDataInput(page,'#signupRepeatPassword','A1b2c3d4e5f6g7h8i' ,'Password has to be from 8 to 15 characters');
    });
    test('Check Re-enter Password with numbers only', async ({ page }) => {
        await checkWrongDataInput(page,'#signupRepeatPassword','12345678' ,'Password has to be from 8 to 15 characters');
    });
    test('Check Re-enter Password with characters only', async ({ page }) => {
        await checkWrongDataInput(page,'#signupRepeatPassword','aaaaaaaA' ,'Password has to be from 8 to 15 characters');
    });
    test('Check Re-enter Password with no uppercase letters', async ({ page }) => {
        await checkWrongDataInput(page,'#signupRepeatPassword','password1' ,'Password has to be from 8 to 15 characters');
    });
    test('Check Re-enter Password with no lowercase letters', async ({ page }) => {
        await checkWrongDataInput(page,'#signupRepeatPassword','PASSWORD1' ,'Password has to be from 8 to 15 characters');
    });
    test('Check Re-enter Password not matched with Password', async ({ page }) => {
        await page.fill('#signupPassword','Password1');
        await page.fill('#signupRepeatPassword', 'Password2');
        await page.click('body');
        await page.getByText('Passwords do not match').isVisible();
        const isDisabled = await page.getByRole('button', { name: 'Register' }).isDisabled();
        expect(isDisabled).toBeTruthy();
    });
});
