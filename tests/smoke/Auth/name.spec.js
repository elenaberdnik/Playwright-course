import { test, expect } from '@playwright/test';
import { SignupPopup } from '../../../src/PageObjects/SignupPopup.js';

test.describe('User Registration - Name validation', () => {
  let signupPopup;

  test.beforeEach(async ({ page }) => {
    signupPopup = new SignupPopup(page);
    await signupPopup.navigate();
    await signupPopup.openSignupPopup();
  });

  // 1. Name is required
  test('Name is required (empty field)', async () => {
    await signupPopup.nameInput.fill('');
    await signupPopup.nameInput.blur();

    const error = signupPopup.registrationPopup.getByText('Name required');
    await expect(error).toBeVisible();
    await expect(signupPopup.nameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });

  // 2. Name is invalid (not English symbols)
  test('Name is invalid (not English symbols)', async () => {
    await signupPopup.nameInput.fill('Іван');
    await signupPopup.nameInput.blur();

    const error = signupPopup.registrationPopup.getByText('Name is invalid');
    await expect(error).toBeVisible();
    await expect(signupPopup.nameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });

  // 3. less than 2 characters
  test('Name is invalid (less than 2 characters)', async () => {
    await signupPopup.nameInput.fill('A');
    await signupPopup.nameInput.blur();

    const error = signupPopup.registrationPopup.getByText(
      'Name has to be from 2 to 20 characters long',
    );
    await expect(error).toBeVisible();
    await expect(signupPopup.nameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });

  // 4. more than 20 characters
  test('Name is invalid (more than 20 characters)', async () => {
    await signupPopup.nameInput.fill('AlexanderthegreatestTYUI');
    await signupPopup.nameInput.blur();

    const error = signupPopup.registrationPopup.getByText(
      'Name has to be from 2 to 20 characters long',
    );
    await expect(error).toBeVisible();
    await expect(signupPopup.nameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });
});
