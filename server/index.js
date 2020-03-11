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
  if (!(/(?!^0)(^\d+$)/.test(req.params.productId))) return res.status(400).json({ error: 'please enter a positive integer productId' });
  const text = `
    SELECT *
      FROM "products"
     WHERE "productId" = $1
  `;
  const values = [req.params.productId];
  db.query(text, values)
    .then(data => {
      if (data.rows.length === 0) throw new ClientError(`productId ${req.params.productId} does not exist`, 404);
      return res.json(data.rows[0]);
    })
    .catch(err => next(err));
});

app.get('/api/cart/', (req, res, next) => {
  if (!('cartId' in req.session)) return [];
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
  const values = [req.session.cartId];
  db.query(text, values)
    .then(data => res.json(data.rows))
    .catch(err => next(err));
});

app.post('/api/cart', (req, res, next) => {
  const { productId } = req.body;
  if (!(/(?!^0)(^\d+$)/.test(productId))) return res.status(400).json({ error: 'please enter a positive integer for the productId' });
  let text = `
    SELECT "price"
      FROM "products"
     WHERE "productId" = $1
  `;
  const values = [productId];
  db.query(text, values)
    .then(priceData => {
      if (priceData.rows.length === 0) throw new ClientError(`productId ${productId} does not exist`, 400);
      if ('cartId' in req.session) return { price: priceData.rows[0].price, cartId: req.session.cartId };
      text = `
        INSERT INTO "carts" ("cartId", "createdAt")
        VALUES      (default, default)
        RETURNING   "cartId"
      `;
      return db.query(text).then(cartIdData => ({ price: priceData.rows[0].price, cartId: cartIdData.rows[0].cartId }));
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

app.post('/api/orders', (req, res, next) => {
  const { cartId } = req.session;
  if (!(/(?!^0)(^\d+$)/.test(cartId))) return res.status(400).json({ error: 'please enter a positive integer for the cartId' });

  const { name, creditCard, shippingAddress } = req.body;
  if (!name || /[^a-zA-Z ]/.test(name)) return res.status(400).json({ error: 'please enter a valid name' });
  if (!creditCard || /[^\d ]/.test(creditCard)) return res.status(400).json({ error: 'please enter a valid credit card number' });
  if (!shippingAddress || /[^a-zA-Z\d ]/.test(shippingAddress)) return res.status(400).json({ error: 'please enter a valid shipping address' });

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
      res.status(201).json(data);
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

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
