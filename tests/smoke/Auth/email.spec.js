import { test, expect } from '@playwright/test';
import { SignupPopup } from '../../../src/PageObjects/SignupPopup.js';

test.describe('User Registration - Email validation', () => {
  let signupPopup;

  test.beforeEach(async ({ page }) => {
    signupPopup = new SignupPopup(page);
    await signupPopup.navigate();
    await signupPopup.openSignupPopup();
  });

  test('Email is required (empty field)', async () => {
    await signupPopup.emailInput.fill('');
    await signupPopup.emailInput.blur();

    const error = signupPopup.registrationPopup.getByText('Email required');
    await expect(error).toBeVisible();
    await expect(signupPopup.emailInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });

  test('Email is invalid', async () => {
    await signupPopup.emailInput.fill('invalidEmail');
    await signupPopup.emailInput.blur();

    const error = signupPopup.registrationPopup.getByText('Email is incorrect');
    await expect(error).toBeVisible();
    await expect(signupPopup.emailInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });
});
