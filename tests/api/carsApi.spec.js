import { adminApiTest as test, expect } from '../../src/fixtures/adminApi.fixture.js';

test.describe('POST /api/cars — create car', () => {
  test('should create a car successfully with valid data', async ({ api }) => {
    const newCar = { carBrandId: 1, carModelId: 1, mileage: 122 };

    const response = await api.post('/api/cars', { data: newCar });
    await expect(response).toBeOK();

    const body = await response.json();
    expect(body.status).toBe('ok');

 
    expect(body.data).toMatchObject({
      carBrandId: 1,
      carModelId: 1,
      mileage: 122,
    });
  });

  test('should not create a car without mileage (400)', async ({ api }) => {
    const invalidCar = { carBrandId: 1, carModelId: 1 };

    const response = await api.post('/api/cars', { data: invalidCar });
    expect(response.status()).toBe(400);

    const body = await response.json();
 
    expect(body.status).toBe('error');
    expect(body.message).toBeTruthy();
  });

  test('should not create a car with invalid data types (400)', async ({ api }) => {
    const invalidCar = { carBrandId: 'invalid', carModelId: -1, mileage: 'abc' };

    const response = await api.post('/api/cars', { data: invalidCar });
    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.status).toBe('error');
    expect(body.message).toBeTruthy();
  });
});
