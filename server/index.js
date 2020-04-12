require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  const text = `
    SELECT "productId",
           "name",
           "price",
           "image",
           "shortDescription"
      FROM "products"
  `;
  db.query(text)
    .then(data => res.json(data.rows))
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const { productId } = req.params;
  if (!(/(?!^0)(^\d+$)/.test(productId))) return res.status(400).json({ error: 'productId must be a positive integer' });
  const text = `
    SELECT *
      FROM "products"
     WHERE "productId" = $1
  `;
  const values = [productId];
  db.query(text, values)
    .then(data => {
      if (!data.rows.length) throw new ClientError(`productId ${productId} does not exist`, 404);
      return res.json(data.rows[0]);
    })
    .catch(err => next(err));
});

app.get('/api/cart/', (req, res, next) => {
  const { cartId } = req.session;
  if (!cartId) return res.json([]);
  const text = `
    SELECT "c"."cartItemId",
           "c"."price",
           "p"."productId",
           "p"."image",
           "p"."name",
           "p"."shortDescription"
      FROM "cartItems" AS "c"
      JOIN "products" AS "p" USING ("productId")
     WHERE "c"."cartId" = $1
    `;
  const values = [cartId];
  db.query(text, values)
    .then(data => res.json(data.rows))
    .catch(err => next(err));
});

app.post('/api/cart', (req, res, next) => {
  const { productId } = req.body;
  const { cartId } = req.session;
  if (!(/(?!^0)(^\d+$)/.test(productId))) return res.status(400).json({ error: 'productId must be a positive integer' });
  const sqlSelect = `
    SELECT "price"
      FROM "products"
     WHERE "productId" = $1
  `;
  const values = [productId];
  db.query(sqlSelect, values)
    .then(priceData => {
      if (!priceData.rows.length) throw new ClientError(`productId ${productId} does not exist`, 400);
      if (cartId) return { price: priceData.rows[0].price, cartId };
      const sqlInsert = `
        INSERT INTO "carts" ("cartId", "createdAt")
        VALUES      (default, default)
        RETURNING   "cartId"
      `;
      return db.query(sqlInsert).then(cartIdData => ({ price: priceData.rows[0].price, cartId: cartIdData.rows[0].cartId }));
    })
    .then(data => {
      req.session.cartId = data.cartId;
      const text = `
        INSERT INTO "cartItems"("cartId", "productId", "price")
        VALUES      ($1, $2, $3)
        RETURNING   "cartItemId"
      `;
      const values = [data.cartId, productId, data.price];
      return db.query(text, values).then(cartItemIdData => cartItemIdData.rows[0]);
    })
    .then(cartItemIdData => {
      const text = `
      SELECT "c"."cartItemId",
             "c"."price",
             "p"."productId",
             "p"."image",
             "p"."name",
             "p"."shortDescription"
        FROM "cartItems" AS "c"
        JOIN "products" AS "p" USING ("productId")
       WHERE "c"."cartItemId" = $1
      `;
      const values = [cartItemIdData.cartItemId];
      return db.query(text, values).then(data => res.status(201).json(data.rows[0]));
    })
    .catch(err => next(err));
});

app.delete('/api/cart/', (req, res, next) => {
  const { cartId } = req.session;
  const { productId } = req.body;
  if (!cartId) return res.status(400).json({ error: 'missing or invalid cartId' });
  if (!(/(?!^0)(^\d+$)/.test(productId))) return res.status(400).json({ error: 'productId must be a positive integer' });
  const text = `
    DELETE FROM "cartItems"
    WHERE       "cartId" = $1
    AND         "productId" = $2
    RETURNING   *;
  `;
  const values = [cartId, productId];
  db.query(text, values)
    .then(result => {
      if (!result.rows.length) return res.status(404).json({ error: `productId ${productId} does not exist` });
      return res.status(204).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.post('/api/orders', (req, res, next) => {
  const { cartId } = req.session;
  if (!(/(?!^0)(^\d+$)/.test(cartId))) return res.status(400).json({ error: 'missing or invalid cartId' });

  const { name, creditCard, shippingAddress } = req.body;
  if (!name || !(/^(?!.* {2,})(?=\S)(?=.*\S$)[a-zA-Z ]{5,67}$/.test(name))) {
    return res.status(400).json({ error: 'missing or invalid name' });
  }
  if (!creditCard || !(/^[\d]{16}$/.test(creditCard))) {
    return res.status(400).json({ error: 'missing or invalid credit card number' });
  }
  if (!shippingAddress || !(/^(?!.* {2,})(?=\S)(?=.*\S$)[a-zA-Z\d.,# ]{21,156}$/.test(shippingAddress))) {
    return res.status(400).json({ error: 'missing or invalid shipping address' });
  }

  const text = `
    INSERT INTO "orders" ("cartId", "name", "creditCard", "shippingAddress")
    VALUES      ($1, $2, $3, $4)
    RETURNING   "orderId",
                "createdAt",
                "name",
                "creditCard",
                "shippingAddress"
  `;
  const values = [cartId, name, creditCard, shippingAddress];
  db.query(text, values)
    .then(data => {
      delete req.session.cartId;
      res.status(201).json(data.rows[0]);
    })
    .catch(err => next(err));
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT);
