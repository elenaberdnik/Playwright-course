import { expect } from '@playwright/test';


export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goTo(url) {
    await this.page.goto(url);
  }

  async expectVisible(element) {
    await expect(element).toBeVisible();
  }
}

