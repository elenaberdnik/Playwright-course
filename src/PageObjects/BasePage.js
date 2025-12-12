import { expect } from '@playwright/test';


export class BasePage {
constructor(page, url) {
        this.page = page;
        this._url = url;
    }

  async goTo() {
    await this.page.goto(this._url)
  }

  async expectVisible(element) {
    await expect(element).toBeVisible();
  }
}

