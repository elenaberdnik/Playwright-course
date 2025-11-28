import { test, expect } from '@playwright/test';
import { SignupPopup } from '../../../src/PageObjects/SignupPopup.js';

test.describe('User Registration - Last Name validation', () => {
  let signupPopup;

  test.beforeEach(async ({ page }) => {
    signupPopup = new SignupPopup(page);
    await signupPopup.navigate();
    await signupPopup.openSignupPopup();
  });

  test('Last Name is required (empty field)', async () => {
    await signupPopup.lastNameInput.fill('');
    await signupPopup.lastNameInput.blur();

    const error = signupPopup.registrationPopup.getByText('Last name required');
    await expect(error).toBeVisible();
    await expect(signupPopup.lastNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });

  test('Last Name is invalid (not English symbols)', async () => {
    await signupPopup.lastNameInput.fill('Іванова');
    await signupPopup.lastNameInput.blur();

    const error = signupPopup.registrationPopup.getByText('Last name is invalid');
    await expect(error).toBeVisible();
    await expect(signupPopup.lastNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });

  test('Last Name is invalid (less than 2 characters)', async () => {
    await signupPopup.lastNameInput.fill('A');
    await signupPopup.lastNameInput.blur();

    const error = signupPopup.registrationPopup.getByText(
      'Last name has to be from 2 to 20 characters long',
    );
    await expect(error).toBeVisible();
    await expect(signupPopup.lastNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });

  test('Last Name is invalid (more than 20 characters)', async () => {
    await signupPopup.lastNameInput.fill('AlexanderthegreatestTYUI');
    await signupPopup.lastNameInput.blur();

    const error = signupPopup.registrationPopup.getByText(
      'Last name has to be from 2 to 20 characters long',
    );
    await expect(error).toBeVisible();
    await expect(signupPopup.lastNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });
});
