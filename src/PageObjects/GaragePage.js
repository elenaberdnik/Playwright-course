
import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class GaragePage extends BasePage {
  constructor(page) {
    super(page);
    this.url = '/panel/garage';

    this.garageRoot = page.locator('app-garage, .garage-page, .panel-page').first();
    this.addCarBtn = page.getByRole('button', { name: 'Add car' });
  }

  async open() {
    await this.page.goto(this.url);
  }

  async expectGarageVisible() {
    await expect(this.garageRoot).toBeVisible();
  }

  async addVehicle({ make, model, mileage }) {
    await this.addCarBtn.click();
    await this.page.getByLabel('Brand').selectOption(make);
    await this.page.getByLabel('Model').selectOption(model);
    await this.page.getByLabel('Mileage').fill(mileage);
    await this.page.getByRole('button', { name: 'Add' }).click();
  }

 async expectCarInList(carName) {
  await expect(this.page.getByText(carName).first()).toBeVisible();
}

}
