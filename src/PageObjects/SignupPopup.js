
import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class SignupPopup extends BasePage {
  constructor(page) {
    super(page);
    this.url = '/';

  
    this.signupButton = page.getByRole('button', { name: 'Sign up' });

   
    this.registrationPopup = page.locator('.modal-content');

    
    this.nameInput = this.registrationPopup.locator('#signupName');
    this.lastNameInput = this.registrationPopup.locator('#signupLastName');
    this.emailInput = this.registrationPopup.locator('#signupEmail');
    this.passwordInput = this.registrationPopup.locator('#signupPassword');
    this.repeatPasswordInput = this.registrationPopup.locator('#signupRepeatPassword');

   
    this.registerButton = this.registrationPopup.getByRole('button', { name: 'Register' });
    this.successMessage = page.locator('.alert-success');
  }

  async navigate() {
    await this.goTo(this.url);
  }

  async openSignupPopup() {
    await this.signupButton.click();
    await this.expectVisible(this.registrationPopup);
  }

  
  async fillRegistrationForm(user) {
    await this.nameInput.fill(user.name);
    await this.lastNameInput.fill(user.lastName);
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.repeatPasswordInput.fill(user.repeatPassword);
  }

  async submitRegistrationForm() {
    await this.registerButton.click();
  }

  async expectRegistrationSuccess() {
    await expect(this.registrationPopup).not.toBeVisible();
    await expect(this.successMessage).toHaveText('Registration complete');
  }
}
