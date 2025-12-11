
import { test as base, expect } from '@playwright/test';
import ProfilePage from '../pageObjects/ProfilePage.js';


export const test = base.extend({
  profilePage: async ({ page }, use) => {
    const profilePage = new ProfilePage(page); 
    await use(profilePage);                    
  },
});


export { expect };





