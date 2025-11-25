
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('User Registration - Name validation', () => {
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

  // 1. Name required 
  test('Name is required (empty field)', async ({ page }) => {
    const userData = createUserData();
    const popup = page.locator('.modal-content');

    const nameInput = popup.locator('#signupName');
    const lastNameInput = popup.locator('#signupLastName');
    const registerButton = popup.getByRole('button', { name: 'Register' });

    await lastNameInput.fill(userData.lastName);
    await popup.locator('#signupEmail').fill(userData.email);
    await popup.locator('#signupPassword').fill(userData.password);
    await popup.locator('#signupRepeatPassword').fill(userData.repeatPassword);

    await nameInput.click();
    await lastNameInput.click();

    await expect(popup.getByText('Name required')).toBeVisible();
    await expect(registerButton).toBeDisabled();
    await expect(nameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    
  });

  // 2. Not English symbols
  test('Name is invalid (not English symbols)', async ({ page }) => {
    const userData = createUserData();
    const popup = page.locator('.modal-content');

    const nameInput = popup.locator('#signupName');
    const lastNameInput = popup.locator('#signupLastName');
    const registerButton = popup.getByRole('button', { name: 'Register' });

    await nameInput.fill('Іван'); 
    await lastNameInput.fill(userData.lastName);
    await popup.locator('#signupEmail').fill(userData.email);
    await popup.locator('#signupPassword').fill(userData.password);
    await popup.locator('#signupRepeatPassword').fill(userData.repeatPassword);

    
    await lastNameInput.click();

    await expect(popup.getByText('Name is invalid')).toBeVisible();
    await expect(nameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(registerButton).toBeDisabled();
  });

  // 3. Name too short
  test('Name too short (< 2 characters)', async ({ page }) => {
    const userData = createUserData();
    const popup = page.locator('.modal-content');

    const nameInput = popup.locator('#signupName');
    const lastNameInput = popup.locator('#signupLastName');
    const registerButton = popup.getByRole('button', { name: 'Register' });

    await nameInput.fill('A');
    await lastNameInput.fill(userData.lastName);
    await popup.locator('#signupEmail').fill(userData.email);
    await popup.locator('#signupPassword').fill(userData.password);
    await popup.locator('#signupRepeatPassword').fill(userData.repeatPassword);

    await lastNameInput.click(); 

    await expect(
      popup.getByText('Name has to be from 2 to 20 characters long')
    ).toBeVisible();
    await expect(nameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(registerButton).toBeDisabled();
  });

  // 4. Name too long
  test('Name too long (> 20 characters)', async ({ page }) => {
    const userData = createUserData();
    const popup = page.locator('.modal-content');

    const nameInput = popup.locator('#signupName');
    const lastNameInput = popup.locator('#signupLastName');
    const registerButton = popup.getByRole('button', { name: 'Register' });

    await nameInput.fill('VeryVeryVeryLongName123'); 
    await lastNameInput.fill(userData.lastName);
    await popup.locator('#signupEmail').fill(userData.email);
    await popup.locator('#signupPassword').fill(userData.password);
    await popup.locator('#signupRepeatPassword').fill(userData.repeatPassword);

    await lastNameInput.click(); 

    await expect(
      popup.getByText('Name has to be from 2 to 20 characters long')
    ).toBeVisible();
    await expect(nameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(registerButton).toBeDisabled();
  });

  
  test('Name is valid', async ({ page }) => {
    const userData = createUserData();
    const popup = page.locator('.modal-content');

    const nameInput = popup.locator('#signupName');
    const lastNameInput = popup.locator('#signupLastName');
    const registerButton = popup.getByRole('button', { name: 'Register' });
    

   
    await nameInput.fill('Ivanka');
    await lastNameInput.fill(userData.lastName);
    await popup.locator('#signupEmail').fill(userData.email);
    await popup.locator('#signupPassword').fill(userData.password);
    await popup.locator('#signupRepeatPassword').fill(userData.repeatPassword);

    
    await lastNameInput.click();

    await expect(popup.getByText('Name required')).not.toBeVisible();
    await expect(
      popup.getByText('Name has to be from 2 to 20 characters long')
    ).not.toBeVisible();
    await expect(popup.getByText('Name is invalid')).not.toBeVisible();

    await expect(registerButton).toBeEnabled();
    await registerButton.click();
  });
});
