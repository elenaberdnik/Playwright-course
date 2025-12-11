import { test } from '../../src/fixtures/requestProfile.fixture.js';

test('Profile page shows mocked user data', async ({ page, profilePage }) => {

const mockedProfile = {
  status: 'ok',
  data: {
    userId: 999999,
    photoFilename: 'default-user.png',
    name: 'Mocked',
    lastName: 'User',
  },
};

  await page.route('**/api/users/profile', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json; charset=utf-8',
      body: JSON.stringify(mockedProfile),
    });
  });

  await profilePage.goTo();

  const fullName = `${mockedProfile.data.name} ${mockedProfile.data.lastName}`;

  await profilePage.verifyProfileName(fullName);
});
