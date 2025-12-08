import { test as base } from '@playwright/test';
import { GaragePage } from '../PageObjects/GaragePage.js';

export const test = base.extend({
  storageState: 'storageStates/garage-user.json',

  userGaragePage: async ({ page }, use) => {
    const garagePage = new GaragePage(page);

    await garagePage.open();             
    await garagePage.expectGarageVisible();

    await use(garagePage);
  },
});

export const expect = test.expect;
