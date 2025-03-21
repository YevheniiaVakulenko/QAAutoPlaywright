import { expect } from '@playwright/test';
import user from './auth.json';

export async function auth(page) {
    const username = user.username;
    const password = user.password;
    const authUrl = `https://${username}:${password}@qauto.forstudy.space`;

    await page.goto(authUrl);
    await expect(page).toHaveURL('https://qauto.forstudy.space');
}

export async function checkEmpty(page, inputLocator, message) {
    const input = page.locator(inputLocator);
    
    await input.focus();
    await input.blur();
    await expect(page.locator(`text=${message}`)).toBeVisible();

    await expect(input).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
}

export async function checkWrongDataInput(page, inputLocator, inputData, message) {
    const input = page.locator(inputLocator);
    await input.type(inputData);
    await input.blur();
    await expect(page.locator(`text=${message}`)).toBeVisible();
    await expect(input).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
}

export async function addCar(page){
    await page.getByRole('button', { name: 'Add car' }).click();
    await page.getByLabel('Brand').selectOption('2: 3');
    await page.getByLabel('Model').selectOption('6: 12');
    await page.getByRole('spinbutton', { name: 'Mileage' }).fill('12');
    await page.getByRole('button', { name: 'Add' }).click();
}

export async function deleteCar(page){
    await page.locator('.car_edit').click();
    await page.getByRole('button', { name: 'Remove car' }).click();
    await page.getByRole('button', { name: 'Remove' }).click();
}