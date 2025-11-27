import { test } from '@playwright/test';
import { SignupPage } from '../../../src/PageObjects/SignupPage.js';

test.describe('User Registration - Password validation', () => {
let signup;

test.beforeEach(async ({ page }) => {
  signup = new SignupPage(page);
  await signup.navigate();
  await signup.openSignupPopup();
});


  // 1. Password is required
  test('Password is required (empty field)', async ({ page }) => {
    const signup = new SignupPage(page);

    await signup.fillPassword('');
    await signup.blurPassword();
    await signup.expectPasswordError('Password required');
  });

  // 2. Password is too short
  test('Password is too short (less than 8 characters)', async ({ page }) => {
    const signup = new SignupPage(page);

    await signup.fillPassword('Qwe1!');
    await signup.blurPassword();
    await signup.expectPasswordError(
      'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
    );
  });

  // 3. Password without uppercase letter
  test('Password without uppercase letter', async ({ page }) => {
    const signup = new SignupPage(page);

    await signup.fillPassword('qwerty1!');
    await signup.blurPassword();
    await signup.expectPasswordError(
      'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
    );
  });

  // 4. Password too long
  test('Password is too long (more than 15 characters)', async ({ page }) => {
    const signup = new SignupPage(page);

    await signup.fillPassword('QwertyUUUUIIuiop12345!');
    await signup.blurPassword();
    await signup.expectPasswordError(
      'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
    );
  });
}); 
