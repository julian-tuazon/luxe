process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../server/index');
const db = require('../server/database');

const PRODUCT_LIST = require('../server/product-list');

beforeAll(async () => {
  const text = `
        INSERT INTO "carts" ("cartId", "createdAt")
        VALUES      ($1, default)
      `;
  const values = [1];
  await db.query(text, values);
});

beforeEach(async () => {
  const text = `
    INSERT INTO "cartItems" ("cartId", "productId", "price", "quantity")
    VALUES      ($1, $2, $3, $4)
  `;
  const values = [2, 1, 100, 5];
  await db.query(text, values);
});

afterEach(async () => {
  const text = `
    DELETE FROM "cartItems"
  `;
  await db.query(text);
});

afterAll(async () => {
  const text = `
    DELETE FROM "carts"
  `;
  await db.query(text);
  db.end();
});

describe('GET /api/products/', () => {
  test('should return an array of products', async () => {
    const response = await request(app).get('/api/products/');
    expect(response.body).toEqual(PRODUCT_LIST);
    expect(response.statusCode).toBe(200);
  });
});

describe('GET /api/products/:productId', () => {
  describe('valid productId', () => {
    test('should respond with the product details', async () => {
      const response = await request(app).get('/api/products/1');
      expect(response.body).toHaveProperty('image');
      expect(response.body).toHaveProperty('longDescription');
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('price');
      expect(response.body).toHaveProperty('productId', 1);
      expect(response.body).toHaveProperty('shortDescription');
      expect(response.statusCode).toBe(200);
    });
  });
  describe('non-existent productId', () => {
    test('should respond with an object indicating an error (non-existent productId)', async () => {
      const response = await request(app).get('/api/products/25');
      expect(response.body).toEqual({ error: 'productId 25 does not exist' });
      expect(response.statusCode).toBe(404);
    });
  });
});

describe('GET /api/cart', () => {
  describe('missing cartId', () => {
    test('should respond with an empty array of cartItems', async () => {
      const response = await request(app).get('/api/cart/');
      expect(response.body).toEqual([]);
      expect(response.statusCode).toBe(200);
    });
  });
});

describe('POST /api/cart', () => {
  describe('valid productId', () => {
    test('should respond with the newly added cart item', async () => {
      const response = await request(app)
        .post('/api/cart/')
        .send({ productId: 2 });
      expect(response.body).toHaveProperty('image');
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('price');
      expect(response.body).toHaveProperty('productId', 2);
      expect(response.body).toHaveProperty('shortDescription');
      expect(response.statusCode).toBe(201);
    });
  });
  describe('invalid productId', () => {
    test('should respond with an object indicating an error (productId not a positive integer)', async () => {
      const response = await request(app)
        .post('/api/cart/')
        .send({ productId: -1 });
      expect(response.body).toEqual({ error: 'productId must be a positive integer' });
      expect(response.statusCode).toBe(400);
    });
  });
  describe('non-existent productId', () => {
    test('should respond with an object indicating an error (non-existent productId)', async () => {
      const response = await request(app)
        .post('/api/cart/')
        .send({ productId: 25 });
      expect(response.body).toEqual({ error: 'productId 25 does not exist' });
      expect(response.statusCode).toBe(400);
    });
  });
});
