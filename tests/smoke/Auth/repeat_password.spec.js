import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('User Registration - Repeat Password validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Sign up' }).click();
  });

  const createUserData = () => {
    const password = `Qwerty${faker.number.int({ min: 10, max: 20 })}!`;
    return {
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password,
      repeatPassword: password,
    };
  };

  // 1. Repeat Password is required
  
    test('Repeat Password is required (empty field)', async ({ page }) => {
        const popup = page.locator('.modal-content');

        const repeatPasswordInput = popup.locator('#signupRepeatPassword');
        await repeatPasswordInput.fill('');
        await repeatPasswordInput.blur();

        const repeatPasswordError = popup.getByText('Re-enter password required');
        await expect(repeatPasswordError).toBeVisible();
        await expect(repeatPasswordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(repeatPasswordError).toHaveText('Re-enter password required');
    });

  // 2. Repeat Passwords do not match
  test('Repeat Password is invalid (do not match)', async ({ page }) => {
    const userData = createUserData();
    const popup = page.locator('.modal-content');
    const passwordInput = popup.locator('#signupPassword');
    const repeatPasswordInput = popup.locator('#signupRepeatPassword');
    const registerButton = popup.getByRole('button', { name: 'Register' });

    await popup.locator('#signupName').fill(faker.person.firstName());
    await popup.locator('#signupLastName').fill(userData.lastName);
    await popup.locator('#signupEmail').fill(userData.email);

    await passwordInput.fill(userData.password);
    await repeatPasswordInput.fill('Qwerty99!'); 
    await passwordInput.click();                 

    await expect(popup.getByText('Passwords do not match')).toBeVisible();
    await expect(repeatPasswordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(registerButton).toBeDisabled();
  });
});
