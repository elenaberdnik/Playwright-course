import { test } from '@playwright/test';
import { SignupPage } from '../../../src/PageObjects/SignupPage.js';


test.describe('User Registration - Last Name validation', () => {
let signup;

test.beforeEach(async ({ page }) => {
  signup = new SignupPage(page);
  await signup.navigate();
  await signup.openSignupPopup();
});


    // 1. Last Name is required
    test('Last Name is required (empty field)', async ({ page }) => {
        const signup = new SignupPage(page);

        await signup.fillLastName('');

        await signup.blurLastName();

        await signup.expectLastNameError('Last name required');
    }
    );

    // 2. Last Name is invalid 
    test('Last Name is invalid (not English symbols)', async ({ page }) => {
        const signup = new SignupPage(page);

        await signup.fillLastName('Іванова'); 
        await signup.blurLastName();

        await signup.expectLastNameError('Last name is invalid');

    }
    );

    // 3. wrong length (less than 2 characters)
    test('Last Name is invalid (less than 2 characters)', async ({ page }) => {
        const signup = new SignupPage(page);

        await signup.fillLastName('A'); 
        await signup.blurLastName();

        await signup.expectLastNameError('Last name has to be from 2 to 20 characters long');
    }
    );

    // 4. wrong length (more than 20 characters) 
    test('Last Name is invalid (more than 20 characters)', async ({ page }) => {
        const signup =
            new SignupPage(page);

        await signup.fillLastName('AlexanderthegreatestTYUI'); 
        await signup.blurLastName();

        await signup.expectLastNameError('Last name has to be from 2 to 20 characters long');
    }
    );
}
);
