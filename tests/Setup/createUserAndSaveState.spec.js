import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { SignupPopup } from '../../src/PageObjects/SignupPopup.js';

test('create new user and save storage state', async ({ page }) => {
  const signupPopup = new SignupPopup(page);


  const password = `Qwerty${faker.number.int({ min: 10, max: 20 })}!`;
  const user = {
    name: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password,
    repeatPassword: password,
  };

 
  await signupPopup.navigate();
  await signupPopup.openSignupPopup();
  await signupPopup.fillRegistrationForm(user);
  await signupPopup.submitRegistrationForm();
  await signupPopup.expectRegistrationSuccess();


  await page.waitForURL('/panel/garage');

 
  await page.context().storageState({
    path: 'storageStates/garage-user.json',
  });
});
