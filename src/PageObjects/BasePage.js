import { expect } from '@playwright/test';

export class BasePage {
    constructor(page) {
        this.page = page;
    }

    async goTo(url) {
        await this.page.goto(url);
    }
async getPageTitle() {
        return this.page.title();
    }
    async clickElement(element) {
        await element.click();

    }
 async fillInput(element, value) {
  await element.fill(value);
}

  async expectVisible(element) {
    await expect(element).toBeVisible();
  }
}
