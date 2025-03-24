import { Page, Locator, expect } from "@playwright/test";

export class GaragePage {
  private page: Page;
  private garageLabel: Locator;
  private emptyPanel: Locator;
  private addCarButton: Locator;
  private carList: Locator;
  private carName: Locator;
  private addFuelButton: Locator;
  private updateCarInfoButton: Locator;
  private updateMileageInput: Locator;
  private updateMileageButton: Locator;
  private updateMileageDate: Locator;
  private removeButton: Locator;
  private removeConfirmButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.garageLabel = page.getByText('Garage');
    this.emptyPanel = page.locator('.panel-page_empty');
    this.addCarButton = page.getByText('Add car');
    this.carList = page.locator('.car-list');
    this.carName = page.locator('.car_name');
    this.addFuelButton = page.getByText('Add fuel expense');
    this.updateCarInfoButton = page.locator('.car_edit');
    this.updateMileageInput = page.getByRole('spinbutton');
    this.updateMileageButton = page.locator('.update-mileage-form_submit');
    this.updateMileageDate = page.locator('.car_update-mileage');
    this.removeButton = page.getByRole('button', { name: 'Remove car' });
    this.removeConfirmButton = page.getByRole('button', { name: 'Remove' })
  }

    async verifyEmptyPanel(){
        await this.page.reload()
        await expect(this.emptyPanel).toBeVisible();
    }

    async updateMileageValue(mileage){
        await this.updateMileageInput.clear();
        await this.updateMileageInput.fill(mileage);
    }
    async verifyCarName(expectedCarName) {
        await this.page.reload();
        await expect(this.carName).toContainText(expectedCarName);
    }

    async verifyUpdateMileageDate(expectedDate) {
        await expect(this.updateMileageDate).toContainText(expectedDate);
    }
    
    async verifyUpdateMileageValue(expectedValue) {
        await this.page.reload();
        console.log(this.updateMileageInput)
        await expect(this.updateMileageInput).toHaveValue(expectedValue);
    }

    async clickUpdateMileageButton() {
        await this.updateMileageButton.click();
    }

    async addCar(){
        await this.page.getByRole('button', { name: 'Add car' }).click();
        await this.page.getByLabel('Brand').selectOption('2: 3');
        await this.page.getByLabel('Model').selectOption('6: 12');
        await this.page.getByRole('spinbutton', { name: 'Mileage' }).fill('12');
        const responsePromise = this.page.waitForResponse('https://qauto.forstudy.space/api/cars');
        await this.page.getByRole('button', { name: 'Add' }).click();
        const response = await responsePromise;
        const responseBody = await response.json();
        const carId = await responseBody?.data?.id;
        console.log('Car ID:', carId);
        return carId;
    }

    async deleteCar(){
        await this.updateCarInfoButton.click();
        await this.removeButton.click();
        await this.removeConfirmButton.click();
    }
}