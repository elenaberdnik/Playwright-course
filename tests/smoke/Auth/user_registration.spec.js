import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { SignupPage } from '../../../src/PageObjects/SignupPage.js';




test ('should register a new user successfully', async ({ page }) => {
  const signup = new SignupPage(page);

  const password = `Qwerty${faker.number.int({ min: 10, max: 20 })}!`;
  const userData = {
    name: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password,
    repeatPassword: password,
  };
  await signup.navigate();
  await signup.openSignupPopup();
  await signup.expectRegisterDisabled();
  await signup.fillRegistrationForm(userData);
   await signup.expectRegisterEnabled();
  await signup.submitRegistrationForm();
  await signup.expectRegistrationSuccess();
}
);























