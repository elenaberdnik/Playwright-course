import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { SignupPopup } from '../../../src/pageObjects/SignupPopup.js';

test('should register a new user successfully', async ({ page }) => {
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


  await expect(signupPopup.registerButton).toBeDisabled();

  await signupPopup.fillRegistrationForm(user);

  await expect(signupPopup.registerButton).toBeEnabled();

  await signupPopup.submitRegistrationForm();
  await signupPopup.expectRegistrationSuccess();
});


