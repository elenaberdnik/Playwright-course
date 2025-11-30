import { test, expect } from '@playwright/test';
import { SignupPopup } from '../../../src/PageObjects/SignupPopup.js';

test.describe('User Registration - Password validation', () => {
  let signupPopup;

  test.beforeEach(async ({ page }) => {
    signupPopup = new SignupPopup(page);
    await signupPopup.navigate();
    await signupPopup.openSignupPopup();
  });

  test('Password is required (empty field)', async () => {
    await signupPopup.passwordInput.fill('');
    await signupPopup.passwordInput.blur();

    const error = signupPopup.registrationPopup.getByText('Password required');
    await expect(error).toBeVisible();
    await expect(signupPopup.passwordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });

  test('Password is too short (less than 8 characters)', async () => {
    await signupPopup.passwordInput.fill('Qwe1!');
    await signupPopup.passwordInput.blur();

    const error = signupPopup.registrationPopup.getByText(
      'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
    );
    await expect(error).toBeVisible();
    await expect(signupPopup.passwordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });

  test('Password without uppercase letter', async () => {
    await signupPopup.passwordInput.fill('qwerty1!');
    await signupPopup.passwordInput.blur();

    const error = signupPopup.registrationPopup.getByText(
      'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
    );
    await expect(error).toBeVisible();
    await expect(signupPopup.passwordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });

  test('Password is too long (more than 15 characters)', async () => {
    await signupPopup.passwordInput.fill('QwertyUUUUIIuiop12345!');
    await signupPopup.passwordInput.blur();

    const error = signupPopup.registrationPopup.getByText(
      'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
    );
    await expect(error).toBeVisible();
    await expect(signupPopup.passwordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });
});
