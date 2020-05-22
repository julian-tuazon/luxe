process.env.NODE_ENV = 'test';
const request = require('supertest');
const session = require('supertest-session');
const app = require('../server/index');
// const db = require('../server/database');

const PRODUCT_LIST = require('../server/product-list');

let testSession = null;

beforeEach(function () {
  testSession = session(app);
});

// beforeEach(async () => {
//   const text = `
//         INSERT INTO "carts" ("cartId", "createdAt")
//         VALUES      (default, default)
//         RETURNING   "cartId"
//       `;
//   // const values = [1];
//   await db.query(text).then(data => testCartId = data.rows[0].cartId);
// });

// beforeEach(async () => {
//   const text = `
//     INSERT INTO "cartItems" ("cartId", "productId", "price", "quantity")
//     VALUES      (default, $1, $2, $3)
//   `;
//   const values = [1, 100, 5];
//   await db.query(text, values);
// });

// afterEach(async () => {
//   const text = `
//     DELETE FROM "cartItems"
//   `;
//   await db.query(text);
// });

// afterAll(async () => {
//   const text = `
//     DELETE FROM "carts"
//   `;
//   await db.query(text);
//   db.end();
// });

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
  describe('invalid productId', () => {
    test('should respond with an object indicating an error (missing/invalid productId)', async () => {
      const response = await request(app).get('/api/products/three');
      expect(response.body).toEqual({ error: 'missing or invalid productId' });
      expect(response.statusCode).toBe(400);
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
  describe('valid cartId', () => {
    test('should respond with an array of cartItems', async () => {
      await testSession
        .post('/api/cart/')
        .send({ productId: 2 });
      const response = await testSession.get('/api/cart/');
      const result = response.body[0];
      expect(result).toHaveProperty('cartItemId');
      expect(result).toHaveProperty('image');
      expect(result).toHaveProperty('name');
      expect(result).toHaveProperty('productId', 2);
      expect(result).toHaveProperty('price');
      expect(result).toHaveProperty('quantity');
      expect(result).toHaveProperty('shortDescription');
      expect(response.statusCode).toBe(200);
    });
  });

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
      expect(response.body).toEqual({ error: 'missing or invalid productId' });
      expect(response.statusCode).toBe(400);
    });
  });
  describe('non-existent productId', () => {
    test('should respond with an object indicating an error (non-existent productId)', async () => {
      const response = await request(app)
        .post('/api/cart/')
        .send({ productId: 25 });
      expect(response.body).toEqual({ error: 'productId 25 does not exist' });
      expect(response.statusCode).toBe(404);
    });
  });
});

describe('PATCH /api/cart', () => {
  describe('valid cartId, productId, and quantity', () => {
    test('should return modified product in cart', async () => {
      await testSession
        .post('/api/cart/')
        .send({ productId: 2 });
      const response = await testSession
        .patch('/api/cart')
        .send({
          productId: 2,
          quantity: 6
        });
      expect(response.body).toHaveProperty('cartId');
      expect(response.body).toHaveProperty('cartItemId');
      expect(response.body).toHaveProperty('productId', 2);
      expect(response.body).toHaveProperty('price');
      expect(response.body).toHaveProperty('quantity', 6);
      expect(response.statusCode).toBe(200);
    });
  });
  describe('missing cartId', () => {
    test('should respond with an object indicating an error (missing/invalid cartId)', async () => {
      const response = await testSession
        .patch('/api/cart/')
        .send({
          productId: 2,
          quantity: 6
        });
      expect(response.body).toEqual({ error: 'missing or invalid cartId' });
      expect(response.statusCode).toBe(400);
    });
  });
  describe('invalid productId', () => {
    test('should respond with an object indicating an error (productId not a positive integer)', async () => {
      await testSession
        .post('/api/cart/')
        .send({ productId: 2 });
      const response = await testSession
        .patch('/api/cart/')
        .send({
          productId: -1,
          quantity: 3
        });
      expect(response.body).toEqual({ error: 'missing or invalid productId' });
      expect(response.statusCode).toBe(400);
    });
  });
  describe('non-existent productId', () => {
    test('should respond with an object indicating an error (non-existent productId)', async () => {
      await testSession
        .post('/api/cart/')
        .send({ productId: 2 });
      const response = await testSession
        .patch('/api/cart/')
        .send({
          productId: 3,
          quantity: 3
        });
      expect(response.body).toEqual({ error: 'productId 3 does not exist in cart' });
      expect(response.statusCode).toBe(404);
    });
  });
  describe('invalid quantity', () => {
    test('should respond with an object indicating an error (missing/invalid quantity)', async () => {
      await testSession
        .post('/api/cart/')
        .send({ productId: 2 });
      const response = await testSession
        .patch('/api/cart/')
        .send({
          productId: 2,
          quantity: -5
        });
      expect(response.body).toEqual({ error: 'missing or invalid quantity' });
      expect(response.statusCode).toBe(400);
    });
  });
});
