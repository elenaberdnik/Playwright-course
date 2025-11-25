import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('User Registration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should register a new user successfully', async ({ page }) => {
    const password = `Qwerty${faker.number.int({ min: 10, max: 20 })}!`;
    const userData = {
      name: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password,
      repeatPassword: password,
    };

    const signupButton = page.getByRole('button', { name: 'Sign up' });
    await signupButton.click();

    const signupPopup = page.locator('.modal-content');
    await expect(signupPopup).toBeVisible();

    const registerButton = signupPopup.getByRole('button', { name: 'Register' });
    await expect(registerButton).toBeDisabled();

   
    await signupPopup.locator('#signupName').fill(userData.name);
    await signupPopup.locator('#signupLastName').fill(userData.lastName);
    await signupPopup.locator('#signupEmail').fill(userData.email);
    await signupPopup.locator('#signupPassword').fill(userData.password);
    await signupPopup.locator('#signupRepeatPassword').fill(userData.repeatPassword);

  
    await expect(registerButton).toBeEnabled();

    await registerButton.click();

    await expect(signupPopup).not.toBeVisible();
    const successMessage = page.locator('.alert-success');
    await expect(successMessage).toHaveText('Registration complete');
  });
});
