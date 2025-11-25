import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('User Registration - Password validation', () => {
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

  // 1. Password is required
  test('Password is required (empty field)', async ({ page }) => {
    const userData = createUserData();
    const popup = page.locator('.modal-content');

    const passwordInput = popup.locator('#signupPassword');
    const repeatPasswordInput = popup.locator('#signupRepeatPassword');
    const registerButton = popup.getByRole('button', { name: 'Register' });

    await popup.locator('#signupName').fill(faker.person.firstName());
    await popup.locator('#signupLastName').fill(userData.lastName);
    await popup.locator('#signupEmail').fill(userData.email);

    await repeatPasswordInput.fill(userData.repeatPassword);

    await passwordInput.click();
    await repeatPasswordInput.click(); 

    await expect(popup.getByText('Password required')).toBeVisible();
    await expect(passwordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(registerButton).toBeDisabled();
  });

  // 2. Less than 8 characters
  test('Password is invalid (less than 8 characters)', async ({ page }) => {
    const userData = createUserData();
    const popup = page.locator('.modal-content');
    const passwordInput = popup.locator('#signupPassword');
    const repeatPasswordInput = popup.locator('#signupRepeatPassword');
    const registerButton = popup.getByRole('button', { name: 'Register' });

    await popup.locator('#signupName').fill(faker.person.firstName());
    await popup.locator('#signupLastName').fill(userData.lastName);
    await popup.locator('#signupEmail').fill(userData.email);

    await passwordInput.fill('Qwe1!'); 
    await repeatPasswordInput.fill('Qwe1!');

    await repeatPasswordInput.click(); 

    await expect(
      popup.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
    ).toBeVisible();
    await expect(passwordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(registerButton).toBeDisabled();
  });

  // 3. More than 15 characters
  test('Password is invalid (more than 15 characters)', async ({ page }) => {
    const userData = createUserData();
    const popup = page.locator('.modal-content');
    const passwordInput = popup.locator('#signupPassword');
    const repeatPasswordInput = popup.locator('#signupRepeatPassword');
    const registerButton = popup.getByRole('button', { name: 'Register' });

    await popup.locator('#signupName').fill(faker.person.firstName());
    await popup.locator('#signupLastName').fill(userData.lastName);
    await popup.locator('#signupEmail').fill(userData.email);

    const longPwd = 'Qwerty123456789!';
    await passwordInput.fill(longPwd);
    await repeatPasswordInput.fill(longPwd);

    await repeatPasswordInput.click();

    await expect(
      popup.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
    ).toBeVisible();
    await expect(passwordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(registerButton).toBeDisabled();
  });

  // 4. No digit
  test('Password is invalid (no digit)', async ({ page }) => {
    const userData = createUserData();
    const popup = page.locator('.modal-content');
    const passwordInput = popup.locator('#signupPassword');
    const repeatPasswordInput = popup.locator('#signupRepeatPassword');
    const registerButton = popup.getByRole('button', { name: 'Register' });

    await popup.locator('#signupName').fill(faker.person.firstName());
    await popup.locator('#signupLastName').fill(userData.lastName);
    await popup.locator('#signupEmail').fill(userData.email);

    const pwd = 'Qwertyqq!'; 
    await passwordInput.fill(pwd);
    await repeatPasswordInput.fill(pwd);

    await repeatPasswordInput.click();

    await expect(
      popup.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
    ).toBeVisible();
    await expect(passwordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(registerButton).toBeDisabled();
  });

  // 5. No capital letter
  test('Password is invalid (no capital letter)', async ({ page }) => {
    const userData = createUserData();
    const popup = page.locator('.modal-content');
    const passwordInput = popup.locator('#signupPassword');
    const repeatPasswordInput = popup.locator('#signupRepeatPassword');
    const registerButton = popup.getByRole('button', { name: 'Register' });

    await popup.locator('#signupName').fill(faker.person.firstName());
    await popup.locator('#signupLastName').fill(userData.lastName);
    await popup.locator('#signupEmail').fill(userData.email);

    const pwd = 'qwerty12!'; 
    await passwordInput.fill(pwd);
    await repeatPasswordInput.fill(pwd);

    await repeatPasswordInput.click();

    await expect(
      popup.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
    ).toBeVisible();
    await expect(passwordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(registerButton).toBeDisabled();
  });

  // 6. No small letter
  test('Password is invalid (no small letter)', async ({ page }) => {
    const userData = createUserData();
    const popup = page.locator('.modal-content');
    const passwordInput = popup.locator('#signupPassword');
    const repeatPasswordInput = popup.locator('#signupRepeatPassword');
    const registerButton = popup.getByRole('button', { name: 'Register' });

    await popup.locator('#signupName').fill(faker.person.firstName());
    await popup.locator('#signupLastName').fill(userData.lastName);
    await popup.locator('#signupEmail').fill(userData.email);

    const pwd = 'QWERTY12!'; 
    await passwordInput.fill(pwd);
    await repeatPasswordInput.fill(pwd);

    await repeatPasswordInput.click();

    await expect(
      popup.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
    ).toBeVisible();
    await expect(passwordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(registerButton).toBeDisabled();
  });
});
