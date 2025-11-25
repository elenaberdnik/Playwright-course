import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('User Registration - Last Name validation', () => {
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

  // 1. Last Name is required 
  test('Last Name is required (empty field)', async ({ page }) => {
    const userData = createUserData();
    const popup = page.locator('.modal-content');

    const nameInput = popup.locator('#signupName');
    const lastNameInput = popup.locator('#signupLastName');
    const registerButton = popup.getByRole('button', { name: 'Register' });


    await nameInput.fill(faker.person.firstName());
    await popup.locator('#signupEmail').fill(userData.email);
    await popup.locator('#signupPassword').fill(userData.password);
    await popup.locator('#signupRepeatPassword').fill(userData.repeatPassword);

    await lastNameInput.click();
    await nameInput.click();

    await expect(popup.getByText('Last Name required')).toBeVisible();
    await expect(registerButton).toBeDisabled();
  });

    // 2. Last Name not English symbols
    test('Last Name is invalid (not English symbols)', async ({ page }) => {
        const userData = createUserData();
        const popup = page.locator('.modal-content');
        const nameInput = popup.locator('#signupName');
        const lastNameInput = popup.locator('#signupLastName');
        const registerButton = popup.getByRole('button', { name: 'Register' });

        await nameInput.fill(faker.person.firstName());
        await lastNameInput.fill('Іванов'); 
        await popup.locator('#signupEmail').fill(userData.email);
        await popup.locator('#signupPassword').fill(userData.password);
        await popup.locator('#signupRepeatPassword').fill(userData.repeatPassword);

        await nameInput.click();

        await expect(popup.getByText('Last Name is invalid')).toBeVisible();
        await expect(lastNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(registerButton).toBeDisabled();
    });
//3. Last Name min length
    test('Last Name is invalid (less than 2 characters)', async ({ page }) => {
        const userData = createUserData();
        const popup = page.locator('.modal-content');
        const nameInput = popup.locator('#signupName');
        const lastNameInput = popup.locator('#signupLastName');
        const registerButton = popup.getByRole('button', { name: 'Register' });

        await nameInput.fill(faker.person.firstName());
        await lastNameInput.fill('A'); 
        await popup.locator('#signupEmail').fill(userData.email);

        await popup.locator('#signupPassword').fill(userData.password);
        await popup.locator('#signupRepeatPassword').fill(userData.repeatPassword);

        await nameInput.click();
        await expect(popup.getByText('Last Name has to be from 2 to 20 characters long')).toBeVisible();
        await expect(lastNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(registerButton).toBeDisabled();
    });

    //4. Last Name max length
    test('Last Name is invalid (more than 20 characters)', async ({ page }) => {
        const userData = createUserData();
        const popup = page.locator('.modal-content');
        const nameInput = popup.locator('#signupName');
        const lastNameInput = popup.locator('#signupLastName');
        const registerButton = popup.getByRole('button', { name: 'Register' });

        await nameInput.fill(faker.person.firstName());

        await lastNameInput.fill('A'.repeat(21));
        await popup.locator('#signupEmail').fill(userData.email);

        await popup.locator('#signupPassword').fill(userData.password);
        await popup.locator('#signupRepeatPassword').fill(userData.repeatPassword);

        await nameInput.click();

        await expect(popup.getByText('Last Name has to be from 2 to 20 characters long')).toBeVisible();
    
        await expect(lastNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(registerButton).toBeDisabled();
    }
    );
    
});