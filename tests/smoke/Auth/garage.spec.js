import { test } from '../../../src/fixtures/userGaragePage.fixture.js';

test.describe('Garage Page - Smoke Tests', () => {
  test('should display the garage page for a logged-in user', async ({ userGaragePage }) => {
    await userGaragePage.expectGarageVisible();
  });

  test('should  add a new vehicle', async ({ userGaragePage }) => {
    await userGaragePage.addVehicle({
      make: 'Audi',
      model: 'TT',
      mileage: '20',
    });

    await userGaragePage.expectVehicleInList('Audi TT');
  });

});
