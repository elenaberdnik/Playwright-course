import { test, expect, request as pwRequest } from '@playwright/test';

test.describe('POST /api/cars — create car', () => {
  let api;

  test.beforeAll(async () => {
    api = await pwRequest.newContext({
      baseURL: 'https://qauto.forstudy.space',
    });

    const loginResponse = await api.post('/api/auth/signin', {
      data: {
        email: 'tedoneh173@canvect.com',
        password: 'Makar_2019',
      },
    });

    await expect(loginResponse).toBeOK();
  });

  test.afterAll(async () => {
    await api.dispose();
  });

 
  test('should create a car successfully with valid data', async () => {
    const newCar = { carBrandId: 1, carModelId: 1, mileage: 122 };

    const response = await api.post('/api/cars', { data: newCar });
    await expect(response).toBeOK();

    const body = await response.json();
    expect(body.status).toBe('ok');
    expect(body.data).toMatchObject(newCar);
  });

 
  test('should not create a car without mileage', async () => {
    const invalidCar = {
      carBrandId: 1,
      carModelId: 1,
      
    };

    const response = await api.post('/api/cars', { data: invalidCar });

    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.status).not.toBe('ok');
 
  });

  
  test('should not create a car with invalid data types', async () => {
    const invalidCar = {
      carBrandId: 'invalid', 
      carModelId: -1,        
      mileage: 'abc',        
    };

    const response = await api.post('/api/cars', { data: invalidCar });

    expect(response.status()).toBe(400);

    const body = await response.json();
 
    expect(body.status).not.toBe('ok');
   
  });
});
