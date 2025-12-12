import { test as base, expect } from '@playwright/test';

export const adminApiTest = base.extend({
  api: async ({ request }, use) => {

    const loginResponse = await request.post('/api/auth/signin', {
      data: {
        email: process.env.ADMIN_EMAIL ?? 'tedoneh173@canvect.com',
        password: process.env.ADMIN_PASSWORD ?? 'Makar_2019',
      },
    });

    await expect(loginResponse).toBeOK();

    await use(request);
  },
});

export { expect };
