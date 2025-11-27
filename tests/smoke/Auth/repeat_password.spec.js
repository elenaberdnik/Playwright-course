import { test } from '@playwright/test';
import { SignupPage } from '../../../src/PageObjects/SignupPage.js';

test.describe('User Registration - Repeat Password validation', () => {
let signup;

test.beforeEach(async ({ page }) => {
  signup = new SignupPage(page);
  await signup.navigate();
  await signup.openSignupPopup();
});

    // 1. Repeat Password is required
    test('Repeat Password is required (empty field)', async ({ page }) => {
        const signup = new SignupPage(page);

        await signup.fillRepeatPassword('');
        await signup.blurRepeatPassword();
        await signup.expectRepeatPasswordError('Re-enter password required');
    }
    );

    // 2. Repeat Password does not match
    test('Repeat Password does not match', async ({ page }) => {
        const signup = new SignupPage(page);

        await signup.fillPassword('Qwerty123!');
        await signup.fillRepeatPassword('Qwerty124!');
        await signup.blurRepeatPassword();
        await signup.expectRepeatPasswordError('Passwords do not match');
    }
    );
}
);
