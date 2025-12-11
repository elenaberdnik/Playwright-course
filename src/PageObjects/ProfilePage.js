import {expect} from '@playwright/test';
import { BasePage } from './BasePage.js';

export default class ProfilePage  extends BasePage {
    constructor(page) {
        super(page, "/panel/profile")
        this.page = page;
        this.profileName = page.locator("p.profile_name.display-4")
    }

    async verifyProfileName(expectedName){
        await expect(this.profileName).toHaveText(expectedName)
    }
}
