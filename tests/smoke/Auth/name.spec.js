
import { test, expect } from '@playwright/test';

test.describe('User Registration - Name validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    
    await page.getByRole('button', { name: 'Sign up' }).click();
  });

    // 1. Name required
    test('Name is required (empty field)', async ({ page }) => {
        const popup = page.locator('.modal-content');

    const nameInput = popup.locator('#signupName');
    await nameInput.fill('');
    await nameInput.blur();

    const nameError = popup.getByText('Name required');
    await expect(nameError).toBeVisible();
    await expect(nameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(nameError).toHaveText('Name required');
    }
    );
    // 2. Name is invalid (not English symbols)
    test('Name is invalid (not English symbols)', async ({ page }) => {
        const popup = page.locator('.modal-content');

    const nameInput = popup.locator('#signupName');
    await nameInput.fill('Іван'); 
    await nameInput.blur();

    const nameError = popup.getByText('Name is invalid');
    await expect(nameError).toBeVisible();
    await expect(nameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(nameError).toHaveText('Name is invalid');
    }
    );
    // 3. wrong length (less than 2 characters)

    test('Name is invalid (less than 2 characters)', async ({ page }) => {
        const popup = page.locator('.modal-content');

    const nameInput = popup.locator('#signupName');
    await nameInput.fill('A'); 
    await nameInput.blur();

    const nameError = popup.getByText('Name has to be from 2 to 20 characters long');
    await expect(nameError).toBeVisible();
    await expect(nameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(nameError).toHaveText('Name has to be from 2 to 20 characters long');
    }
    );
    // 4. wrong length (more than 20 characters) 
    test('Name is invalid (more than 20 characters)', async ({ page }) => {
        const popup = page.locator('.modal-content');

    const nameInput = popup.locator('#signupName');
    await nameInput.fill('AlexanderthegreatestTYUI'); 
    await nameInput.blur();

    const nameError = popup.getByText('Name has to be from 2 to 20 characters long');
    await expect(nameError).toBeVisible();

    await expect(nameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(nameError).toHaveText('Name has to be from 2 to 20 characters long');
     }
    );

}
);