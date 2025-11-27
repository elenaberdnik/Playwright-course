import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class SignupPage extends BasePage {
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
    await this.clickElement(this.signupButton);
    await this.expectVisible(this.registrationPopup);
  }

  async fillRegistrationForm(user) {
    await this.fillInput(this.nameInput, user.name);
    await this.fillInput(this.lastNameInput, user.lastName);
    await this.fillInput(this.emailInput, user.email);
    await this.fillInput(this.passwordInput, user.password);
    await this.fillInput(this.repeatPasswordInput, user.repeatPassword);
  }
  async submitRegistrationForm() {
    await this.registerButton.click();
  }

  async expectRegisterDisabled() {
    await expect(this.registerButton).toBeDisabled();
  }

  async expectRegisterEnabled() {
    await expect(this.registerButton).toBeEnabled();
  }

  async expectRegistrationSuccess() {
    await expect(this.registrationPopup).not.toBeVisible();
    await expect(this.successMessage).toHaveText('Registration complete');
  }
  // Name input
  async fillName(name) {
    await this.fillInput(this.nameInput, name);
  }
 async blurName() {
    await this.nameInput.blur();
  }
 
async expectNameError(message) {
  const nameError = this.registrationPopup.getByText(message);

  await expect(nameError).toBeVisible();
  await expect(this.nameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
}
// Last Name input
  async fillLastName(lastName) {
    await this.fillInput(this.lastNameInput, lastName);

  }
  async blurLastName() {
    await this.lastNameInput.blur();
  }

  async expectLastNameError (message) {
    const lastNameError = this.registrationPopup.getByText(message);

    await expect(lastNameError).toHaveText(message);
    await expect(lastNameError).toBeVisible();

    await expect(this.lastNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');

  }
    //Email input
  async fillEmail(email) {

    await this.fillInput(this.emailInput, email);
  }
  async blurEmail() {
    await this.emailInput.blur();
  }
  async expectEmailError (message) {
    const emailError = this.registrationPopup.getByText(message);


    await expect(emailError).toHaveText(message);
    await expect(emailError).toBeVisible();
    await expect(this.emailInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  }
  // Password input
  async fillPassword(password) {
    await this.fillInput(this.passwordInput, password);
  }

  async blurPassword() {
    await this.passwordInput.blur();
  }
  
  async expectPasswordError (message) {
    const passwordError = this.registrationPopup.getByText(message);
    await expect(passwordError).toHaveText(message);
    await expect(passwordError).toBeVisible();
    await expect(this.passwordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  }
  // Repeat Password input
  async fillRepeatPassword(repeatPassword) {

    await this.fillInput(this.repeatPasswordInput, repeatPassword);

  }

  async blurRepeatPassword() {

    await this.repeatPasswordInput.blur();
  }

  async expectRepeatPasswordError (message) {
const repeatPasswordError = this.registrationPopup.getByText(message);
    await expect(repeatPasswordError).toHaveText(message);
    await expect(repeatPasswordError).toBeVisible();
    await expect(this.repeatPasswordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');

  }
}





























