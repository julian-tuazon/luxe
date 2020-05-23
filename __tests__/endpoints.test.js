process.env.NODE_ENV = 'test';
const session = require('supertest-session');
const app = require('../server/index');

const PRODUCT_LIST = require('./product-list.json');
const ORDER_INFO = require('./order-info.json');

let testSession = null;

beforeEach(function () {
  testSession = session(app);
});

describe('GET /api/products/', () => {
  test('should return an array of products and status 200', async () => {
    const response = await testSession.get('/api/products/');
    expect(response.body).toEqual(PRODUCT_LIST);
    expect(response.statusCode).toBe(200);
  });
});

describe('GET /api/products/:productId', () => {
  describe('valid productId', () => {
    test('should respond with the product details and status 200', async () => {
      const response = await testSession.get('/api/products/1');
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
    test('should respond with an object indicating an error (missing/invalid productId) and status 400', async () => {
      const response = await testSession.get('/api/products/three');
      expect(response.body).toEqual({ error: 'missing or invalid productId' });
      expect(response.statusCode).toBe(400);
    });
  });
  describe('non-existent productId', () => {
    test('should respond with an object indicating an error (non-existent productId) and status 404', async () => {
      const response = await testSession.get('/api/products/25');
      expect(response.body).toEqual({ error: 'productId 25 does not exist' });
      expect(response.statusCode).toBe(404);
    });
  });
});

describe('GET /api/cart', () => {
  describe('valid cartId', () => {
    test('should respond with an array of cart items and status 200', async () => {
      await testSession
        .post('/api/cart')
        .send({
          productId: 2
        });
      const response = await testSession.get('/api/cart');
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
  describe('valid cartId and empty cart', () => {
    test('should respond with an empty array and status 200', async () => {
      await testSession
        .post('/api/cart')
        .send({
          productId: 2
        });
      await testSession
        .delete('/api/cart')
        .send({
          productId: 2
        });
      const response = await testSession.get('/api/cart');
      expect(response.body).toEqual([]);
      expect(response.statusCode).toBe(200);
    });
  });
  describe('missing cartId', () => {
    test('should respond with an empty array and status 200', async () => {
      const response = await testSession.get('/api/cart');
      expect(response.body).toEqual([]);
      expect(response.statusCode).toBe(200);
    });
  });
});

describe('POST /api/cart', () => {
  describe('valid productId', () => {
    test('should respond with the newly added cart item and status 201', async () => {
      const response = await testSession
        .post('/api/cart')
        .send({
          productId: 2
        });
      expect(response.body).toHaveProperty('cartItemId');
      expect(response.body).toHaveProperty('image');
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('price');
      expect(response.body).toHaveProperty('productId', 2);
      expect(response.body).toHaveProperty('quantity');
      expect(response.body).toHaveProperty('shortDescription');
      expect(response.statusCode).toBe(201);
    });
  });
  describe('invalid productId', () => {
    test('should respond with an object indicating an error (missing/invalid productId) and status 400', async () => {
      const response = await testSession
        .post('/api/cart')
        .send({
          productId: -1
        });
      expect(response.body).toEqual({ error: 'missing or invalid productId' });
      expect(response.statusCode).toBe(400);
    });
  });
  describe('non-existent productId', () => {
    test('should respond with an object indicating an error (non-existent productId) and status 404', async () => {
      const response = await testSession
        .post('/api/cart')
        .send({
          productId: 25
        });
      expect(response.body).toEqual({ error: 'productId 25 does not exist' });
      expect(response.statusCode).toBe(404);
    });
  });
});

describe('PATCH /api/cart', () => {
  describe('valid cartId, productId, and quantity', () => {
    test('should return modified product in cart and status 200', async () => {
      await testSession
        .post('/api/cart')
        .send({
          productId: 2
        });
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
    test('should respond with an object indicating an error (missing/invalid cartId) and status 400', async () => {
      const response = await testSession
        .patch('/api/cart')
        .send({
          productId: 2,
          quantity: 6
        });
      expect(response.body).toEqual({ error: 'missing or invalid cartId' });
      expect(response.statusCode).toBe(400);
    });
  });
  describe('invalid productId', () => {
    test('should respond with an object indicating an error (missing/invalid productId) and status 400', async () => {
      await testSession
        .post('/api/cart')
        .send({
          productId: 2
        });
      const response = await testSession
        .patch('/api/cart')
        .send({
          productId: -1,
          quantity: 3
        });
      expect(response.body).toEqual({ error: 'missing or invalid productId' });
      expect(response.statusCode).toBe(400);
    });
  });
  describe('non-existent productId', () => {
    test('should respond with an object indicating an error (non-existent productId) and status 404', async () => {
      await testSession
        .post('/api/cart')
        .send({
          productId: 2
        });
      const response = await testSession
        .patch('/api/cart')
        .send({
          productId: 3,
          quantity: 3
        });
      expect(response.body).toEqual({ error: 'productId 3 does not exist in cart' });
      expect(response.statusCode).toBe(404);
    });
  });
  describe('invalid quantity', () => {
    test('should respond with an object indicating an error (missing/invalid quantity) and status 400', async () => {
      await testSession
        .post('/api/cart')
        .send({
          productId: 2
        });
      const response = await testSession
        .patch('/api/cart')
        .send({
          productId: 2,
          quantity: -5
        });
      expect(response.body).toEqual({ error: 'missing or invalid quantity' });
      expect(response.statusCode).toBe(400);
    });
  });
});

describe('DELETE /api/cart', () => {
  describe('valid cartId and productId', () => {
    test('should respond with an empty response body and status 204', async () => {
      await testSession
        .post('/api/cart')
        .send({
          productId: 2
        });
      const response = await testSession
        .delete('/api/cart')
        .send({
          productId: 2
        });
      expect(response.body).toEqual({});
      expect(response.statusCode).toBe(204);
    });
  });
  describe('missing cartId', () => {
    test('should respond with an object indicating an error (missing or invalid cartId) and status 400', async () => {
      const response = await testSession
        .delete('/api/cart')
        .send({
          productId: 2
        });
      expect(response.body).toEqual({ error: 'missing or invalid cartId' });
      expect(response.statusCode).toBe(400);
    });
  });
  describe('invalid productId', () => {
    test('should respond with an object indicating an error (missing or invalid productId) and status 400', async () => {
      await testSession
        .post('/api/cart')
        .send({
          productId: 2
        });
      const response = await testSession
        .delete('/api/cart')
        .send({
          productId: -5
        });
      expect(response.body).toEqual({ error: 'missing or invalid productId' });
      expect(response.statusCode).toBe(400);
    });
  });
  describe('non-existent productId', () => {
    test('should respond with an object indicating an error (non-existent productId) and status 404', async () => {
      await testSession
        .post('/api/cart')
        .send({
          productId: 2
        });
      const response = await testSession
        .delete('/api/cart')
        .send({
          productId: 25
        });
      expect(response.body).toEqual({ error: 'productId 25 does not exist in cart' });
      expect(response.statusCode).toBe(404);
    });
  });
});

describe('POST /api/orders', () => {
  describe('valid cartId and complete order info', () => {
    test('should respond with the order info and status 201', async () => {
      await testSession
        .post('/api/cart')
        .send({
          productId: 2
        });
      const response = await testSession
        .post('/api/orders')
        .send(ORDER_INFO);
      expect(response.body).toHaveProperty('name', 'John Doe');
      expect(response.body).toHaveProperty('addressOne', '12345 Front Street');
      expect(response.body).toHaveProperty('addressTwo', 'Apt. 5');
      expect(response.body).toHaveProperty('city', 'Los Angeles');
      expect(response.body).toHaveProperty('state', 'CA');
      expect(response.body).toHaveProperty('zipCode', '92332');
      expect(response.body).toHaveProperty('cardNumber', '1234567891234567');
      expect(response.body).toHaveProperty('cardMonth', '11');
      expect(response.body).toHaveProperty('cardYear', '2023');
      expect(response.body).toHaveProperty('cardCVV', '123');
      expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('orderId');
      expect(response.statusCode).toBe(201);
    });
  });
  describe('valid cartId and complete order info (without optional addressTwo)', () => {
    test('should respond with the order info (null addressTwo) and status 201', async () => {
      await testSession
        .post('/api/cart')
        .send({
          productId: 2
        });

      const orderInfoWithoutAddressTwo = Object.assign({}, ORDER_INFO);
      delete orderInfoWithoutAddressTwo.addressTwo;

      const response = await testSession
        .post('/api/orders')
        .send(orderInfoWithoutAddressTwo);
      expect(response.body).toHaveProperty('name', 'John Doe');
      expect(response.body).toHaveProperty('addressOne', '12345 Front Street');
      expect(response.body).toHaveProperty('addressTwo', null);
      expect(response.body).toHaveProperty('city', 'Los Angeles');
      expect(response.body).toHaveProperty('state', 'CA');
      expect(response.body).toHaveProperty('zipCode', '92332');
      expect(response.body).toHaveProperty('cardNumber', '1234567891234567');
      expect(response.body).toHaveProperty('cardMonth', '11');
      expect(response.body).toHaveProperty('cardYear', '2023');
      expect(response.body).toHaveProperty('cardCVV', '123');
      expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('orderId');
      expect(response.statusCode).toBe(201);
    });
  });
  describe('cartId is deleted after order is placed', () => {
    test('should respond with an object indicating an error (missing or invalid cartId) and status 400', async () => {
      await testSession
        .post('/api/cart')
        .send({
          productId: 2
        });
      await testSession
        .post('/api/orders')
        .send(ORDER_INFO);
      const response = await testSession
        .post('/api/orders')
        .send(ORDER_INFO);
      expect(response.body).toEqual({ error: 'missing or invalid cartId' });
      expect(response.statusCode).toBe(400);
    });
  });
  describe('missing cartId', () => {
    test('should respond with an object indicating an error (missing or invalid cartId) and status 400', async () => {
      const response = await testSession
        .post('/api/orders')
        .send(ORDER_INFO);
      expect(response.body).toEqual({ error: 'missing or invalid cartId' });
      expect(response.statusCode).toBe(400);
    });
  });
  describe('missing order info (cardNumber)', () => {
    test('should respond with an object indicating an error (missing or invalid cardNumber) and status 400', async () => {
      await testSession
        .post('/api/cart')
        .send({
          productId: 2
        });

      const orderInfoWithMissingCardNumber = Object.assign({}, ORDER_INFO);
      delete orderInfoWithMissingCardNumber.cardNumber;

      const response = await testSession
        .post('/api/orders')
        .send(orderInfoWithMissingCardNumber);
      expect(response.body).toEqual({ error: 'missing or invalid cardNumber' });
      expect(response.statusCode).toBe(400);
    });
  });
  describe('invalid order info (name)', () => {
    test('should respond with an object indicating an error (missing or invalid name) and status 400', async () => {
      await testSession
        .post('/api/cart')
        .send({
          productId: 2
        });

      const orderInfoWithInvalidName = Object.assign({}, ORDER_INFO);
      orderInfoWithInvalidName.name = 'invalid Nam3   !';

      const response = await testSession
        .post('/api/orders')
        .send(orderInfoWithInvalidName);
      expect(response.body).toEqual({ error: 'missing or invalid name' });
      expect(response.statusCode).toBe(400);
    });
  });
});
