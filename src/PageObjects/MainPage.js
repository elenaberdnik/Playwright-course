import {expect} from '@playwright/test';
import { BasePage } from './BasePage.js';


export default class MainPage  extends BasePage {
    constructor(page) {
        super(page, "/")
        this.guestLoginBtn = page.getByText('Guest log in')
    }
    async loginAsGuest(){
        await this.guestLoginBtn.click()
        await expect(this.page.getByText('Log out')).toBeVisible()
    
  }

    async loginWithCredentials({email, password}){
        await this.page.getByText('Sign In').click()
        const modal = this.page.locator('.modal-body')
        await modal.locator('#signinEmail').fill(email)
        await modal.locator('#signinPassword').fill(password)
        await this.page.getByText('Login').click()
        //await expect(this.page.getByText('Log out')).toBeVisible()
      
    }
}
// 