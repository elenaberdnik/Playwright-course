import { test, expect } from '@playwright/test';


test.describe('User Registration - Email validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Sign up' }).click();
  });


  // 1 .Email is required
    test('Email is required (empty field)', async ({ page }) => {
       
        const popup = page.locator('.modal-content');

        const emailInput = popup.locator('#signupEmail');
        await emailInput.fill('');
        await emailInput.blur();

        const emailError = popup.getByText('Email required');
        await expect(emailError).toBeVisible();
        await expect(emailInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(emailError).toHaveText('Email required');
    }
    );

    // 2. Email is incorrect
    test('Email is invalid', async ({ page }) => {
        const popup = page.locator('.modal-content');

        const emailInput = popup.locator('#signupEmail');
        await emailInput.fill('invalidEmail'); 
        await emailInput.blur();

        const emailError = popup.getByText('Email is incorrect');
        await expect(emailError).toBeVisible();
        await expect(emailInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(emailError).toHaveText('Email is incorrect');
    
     }
    );

}
);