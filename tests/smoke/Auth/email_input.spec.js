import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('User Registration - Email validation', () => {
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

  // 1 .Email is required
    test('Email is required (empty field)', async ({ page }) => {
        const userData = createUserData();
        const popup = page.locator('.modal-content');

        const emailInput = popup.locator('#signupEmail');

        await popup.locator('#signupName').fill(faker.person.firstName());
        await popup.locator('#signupLastName').fill(userData.lastName);
        await popup.locator('#signupPassword').fill(userData.password);
        await popup.locator('#signupRepeatPassword').fill(userData.repeatPassword);

        await emailInput.click();
        await popup.locator('#signupPassword').click();

        await expect(popup.getByText('Email required')).toBeVisible();
        await expect(emailInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');

    });

    // 2. Email is incorrect
    test('Email is invalid', async ({ page }) => {
        const userData = createUserData();
        const popup = page.locator('.modal-content');
        const emailInput = popup.locator('#signupEmail');

        await popup.locator('#signupName').fill(faker.person.firstName());
        await popup.locator('#signupLastName').fill(userData.lastName);
        await emailInput.fill('invalidEmail'); 
        await popup.locator('#signupPassword').fill(userData.password);
        await popup.locator('#signupRepeatPassword').fill(userData.repeatPassword);

        await popup.locator('#signupPassword').click();

        await expect(popup.getByText('Email is incorrect')).toBeVisible();
        await expect(emailInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    }
    );

}
);
