import { test, expect } from '@playwright/test';


test.describe('User Registration - Last Name validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Sign up' }).click();
  });
// 1. Last Name is required
    test('Last Name is required (empty field)', async ({ page }) => {
        const popup = page.locator('.modal-content');

        const lastNameInput = popup.locator('#signupLastName');
        await lastNameInput.fill('');
        await lastNameInput.blur();

        const lastNameError = popup.getByText('Last Name required');
        await expect(lastNameError).toBeVisible();
        await expect(lastNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(lastNameError).toHaveText('Last name required');
    }
    );

    // 2. Last Name is invalid 
    test('Last Name is invalid (not English symbols)', async ({ page }) => {
        const popup = page.locator('.modal-content');

        const lastNameInput = popup.locator('#signupLastName');
        await lastNameInput.fill('Іванов'); 
        await lastNameInput.blur();

        const lastNameError = popup.getByText('Last name is invalid');
        await expect(lastNameError).toBeVisible();
        await expect(lastNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(lastNameError).toHaveText('Last name is invalid');
    }
    );

    // 3. wrong length (less than 2 characters)
    test('Last Name is invalid (less than 2 characters)', async ({ page }) => {
        const popup = page.locator('.modal-content');

        const lastNameInput = popup.locator('#signupLastName');
        await lastNameInput.fill('A'); 
        await lastNameInput.blur();

        const lastNameError = popup.getByText('Last name has to be from 2 to 20 characters long');
        await expect(lastNameError).toBeVisible();
        await expect(lastNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(lastNameError).toHaveText('Last name has to be from 2 to 20 characters long');
    }
    );

    // 4. wrong length (more than 20 characters) 
    test('Last Name is invalid (more than 20 characters)', async ({ page }) => {
        const popup = page.locator('.modal-content');

        const lastNameInput = popup.locator('#signupLastName');
        await lastNameInput.fill('AlexanderthegreatestTYUI'); 
        await lastNameInput.blur();

        const lastNameError = popup.getByText('Last name has to be from 2 to 20 characters long');
        await expect(lastNameError).toBeVisible();
        await expect(lastNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(lastNameError).toHaveText('Last name has to be from 2 to 20 characters long');
    }
    );
}
);
