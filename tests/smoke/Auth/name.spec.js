import { test } from '@playwright/test';
import { SignupPage } from '../../../src/PageObjects/SignupPage.js';

test.describe('User Registration - Name validation', () => {
  let signup;

test.beforeEach(async ({ page }) => {
  signup = new SignupPage(page);
  await signup.navigate();
  await signup.openSignupPopup();
});


    // 1. Name is required
    test('Name is required (empty field)', async ({ page }) => {
        const signup = new SignupPage(page);

        await signup.fillName('');

        await signup.blurName();

        await signup.expectNameError('Name required');
    }
    );

    // 2. Name is invalid 
    test('Name is invalid (not English symbols)', async ({ page }) => {
        const signup = new SignupPage(page);

        await signup.fillName('Іван'); 
        await signup.blurName();

        await signup.expectNameError('Name is invalid');
    }
    );

    // 3. wrong length (less than 2 characters)
    test('Name is invalid (less than 2 characters)', async ({ page }) => {
        const signup = new SignupPage(page);

        await signup.fillName('A'); 
        await signup.blurName();

        await signup.expectNameError('Name has to be from 2 to 20 characters long');
    }
    );

    // 4. wrong length (more than 20 characters) 
    test('Name is invalid (more than 20 characters)', async ({ page }) => {
        const signup =
            new SignupPage(page);

        await signup.fillName('AlexanderthegreatestTYUI'); 
        await signup.blurName();

        await signup.expectNameError('Name has to be from 2 to 20 characters long');
    }
    );
}
);
      