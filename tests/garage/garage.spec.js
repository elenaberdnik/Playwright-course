import { test } from '../../src/fixtures/userGaragePage.fixture.js';

test.describe.only('Garage Page - Smoke Tests', () => {
  test('should display the garage page for a logged-in user', async ({ userGaragePage }) => {
    await userGaragePage.expectGarageVisible();
  });

  test('should  add a new car', async ({ userGaragePage }) => {
    await userGaragePage.addVehicle({
      make: 'Audi',
      model: 'TT',
      mileage: '20',
    });

    await userGaragePage.expectCarInList('Audi TT');
  });

});
