import { test, expect } from '@playwright/test';
import { SignupPopup } from '../../../src/PageObjects/SignupPopup.js';

test.describe('User Registration - Repeat Password validation', () => {
  let signupPopup;

  test.beforeEach(async ({ page }) => {
    signupPopup = new SignupPopup(page);
    await signupPopup.navigate();
    await signupPopup.openSignupPopup();
  });

  test('Repeat Password is required (empty field)', async () => {
    await signupPopup.repeatPasswordInput.fill('');
    await signupPopup.repeatPasswordInput.blur();

    const error = signupPopup.registrationPopup.getByText('Re-enter password required');
    await expect(error).toBeVisible();
    await expect(signupPopup.repeatPasswordInput).toHaveCSS(
      'border-color',
      'rgb(220, 53, 69)',
    );
  });

  test('Repeat Password does not match', async () => {
    await signupPopup.passwordInput.fill('Qwerty123!');
    await signupPopup.repeatPasswordInput.fill('Qwerty124!');
    await signupPopup.repeatPasswordInput.blur();

    const error = signupPopup.registrationPopup.getByText('Passwords do not match');
    await expect(error).toBeVisible();
    await expect(signupPopup.repeatPasswordInput).toHaveCSS(
      'border-color',
      'rgb(220, 53, 69)',
    );
  });
});
