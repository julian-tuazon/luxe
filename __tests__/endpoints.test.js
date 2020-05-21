const request = require('supertest');
const { app } = require('../server/index');

const PRODUCT_LIST = require('../server/product-list');

describe('GET /api/products/', () => {
  test('should return an array of products', async () => {
    const response = await request(app).get('/api/products/');
    expect(response.body).toEqual(PRODUCT_LIST);
    expect(response.statusCode).toBe(200);
  });
});

describe('GET /api/products/', () => {
  test('should return an array of products', async () => {
    const response = await request(app).get('/api/products/');
    expect(response.body).toEqual(PRODUCT_LIST);
    expect(response.statusCode).toBe(200);
  });
});
