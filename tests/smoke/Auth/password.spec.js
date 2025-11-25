import { test, expect } from '@playwright/test';


test.describe('User Registration - Password validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Sign up' }).click();
  });

    // 1. Password is required

    test('Password is required (empty field)', async ({ page }) => {
        const popup = page.locator('.modal-content');

        const passwordInput = popup.locator('#signupPassword');
        await passwordInput.fill('');
        await passwordInput.blur();
        const passwordError = popup.getByText('Password required');
        await expect(passwordError).toBeVisible();
        await expect(passwordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(passwordError).toHaveText('Password required');
    }
    );

    // 2. Password is too short (less than 8 characters)
    test('Password is invalid (less than 8 characters)', async ({ page }) => {
        const popup = page.locator('.modal-content');

        const passwordInput = popup.locator('#signupPassword');
        await passwordInput.fill('Qwe1!'); 
        await passwordInput.blur();

        await expect(
            popup.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
        ).toBeVisible();
        await expect(passwordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    }
    );

    // 3. Password is too long (more than 15 characters)
    test('Password is invalid (more than 15 characters)', async ({ page }) => {
        const popup = page.locator('.modal-content');

        const passwordInput = popup.locator('#signupPassword');
        await passwordInput.fill('Qwertyuiop12345!'); 
        await passwordInput.blur();

        await expect(
            popup.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
        ).toBeVisible();

        await expect(passwordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    }
    );

    // 4. No capital letter
    test('Password is invalid (no capital letter)', async ({ page }) => {
        const popup = page.locator('.modal-content');

        const passwordInput = popup.locator('#signupPassword');
        await passwordInput.fill('qwerty123!'); 
        await passwordInput.blur();

        await expect(
            popup.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
        ).toBeVisible();
        await expect(passwordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });
});

