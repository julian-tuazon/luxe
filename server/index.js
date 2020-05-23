require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');
const tests = require('./validation-tests');

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
  if (!tests.isValidId(productId)) return res.status(400).json({ error: 'missing or invalid productId' });
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
  if (!tests.isValidId(cartId)) return res.json([]);
  const text = `
    SELECT "c"."cartItemId",
           "c"."price",
           "c"."quantity",
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
  if (!tests.isValidId(productId)) return res.status(400).json({ error: 'missing or invalid productId' });
  const sqlSelect = `
    SELECT "price"
      FROM "products"
     WHERE "productId" = $1
  `;
  const values = [productId];
  db.query(sqlSelect, values)
    .then(priceData => {
      if (!priceData.rows.length) throw new ClientError(`productId ${productId} does not exist`, 404);
      if (tests.isValidId(cartId)) return { price: priceData.rows[0].price, cartId };
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
        INSERT INTO "cartItems"("cartId", "productId", "price", "quantity")
        VALUES      ($1, $2, $3, $4)
        ON CONFLICT ("cartId", "productId") DO UPDATE
        SET         "quantity" = "cartItems"."quantity" + 1
        RETURNING   "cartItemId"
      `;
      const values = [data.cartId, productId, data.price, 1];
      return db.query(text, values).then(cartItemIdData => cartItemIdData.rows[0]);
    })
    .then(cartItemIdData => {
      const text = `
      SELECT "c"."cartItemId",
             "c"."price",
             "c"."quantity",
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

app.patch('/api/cart', (req, res, next) => {
  const { cartId } = req.session;
  const { quantity, productId } = req.body;
  if (!tests.isValidId(cartId)) return res.status(400).json({ error: 'missing or invalid cartId' });
  if (!tests.isValidQuantity(quantity)) return res.status(400).json({ error: 'missing or invalid quantity' });
  if (!tests.isValidId(productId)) return res.status(400).json({ error: 'missing or invalid productId' });

  const text = `
    UPDATE    "cartItems"
    SET       "quantity" = $1
    WHERE     "cartId" = $2
    AND       "productId" = $3
    RETURNING *;
  `;
  const values = [quantity, cartId, productId];
  db.query(text, values)
    .then(data => {
      if (!data.rows.length) throw new ClientError(`productId ${productId} does not exist in cart`, 404);
      return res.json(data.rows[0]);
    })
    .catch(err => next(err));
});

app.delete('/api/cart', (req, res, next) => {
  const { cartId } = req.session;
  const { productId } = req.body;
  if (!tests.isValidId(cartId)) return res.status(400).json({ error: 'missing or invalid cartId' });
  if (!tests.isValidId(productId)) return res.status(400).json({ error: 'missing or invalid productId' });
  const text = `
    DELETE FROM "cartItems"
    WHERE       "cartId" = $1
    AND         "productId" = $2
    RETURNING   *;
  `;
  const values = [cartId, productId];
  db.query(text, values)
    .then(result => {
      if (!result.rows.length) return res.status(404).json({ error: `productId ${productId} does not exist in cart` });
      return res.status(204).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.post('/api/orders', (req, res, next) => {
  const { cartId } = req.session;
  if (!tests.isValidId(cartId)) return res.status(400).json({ error: 'missing or invalid cartId' });

  const { name, addressOne, addressTwo, city, state, zipCode, cardNumber, cardMonth, cardYear, cardCVV } = req.body;

  if (!tests.isValidName(name)) return res.status(400).json({ error: 'missing or invalid name' });
  if (!tests.isValidAddressOne(addressOne)) return res.status(400).json({ error: 'missing or invalid addressOne' });
  if (!tests.isValidAddressTwo(addressTwo)) return res.status(400).json({ error: 'invalid addressTwo' });
  if (!tests.isValidCity(city)) return res.status(400).json({ error: 'missing or invalid city' });
  if (!tests.isValidState(state)) return res.status(400).json({ error: 'missing or invalid state' });
  if (!tests.isValidZipCode(zipCode)) return res.status(400).json({ error: 'missing or invalid zip code' });
  if (!tests.isValidCardNumber(cardNumber)) return res.status(400).json({ error: 'missing or invalid card number' });
  if (!tests.isValidCardMonth(cardMonth)) return res.status(400).json({ error: 'missing or invalid card month' });
  if (!tests.isValidCardYear(cardYear)) return res.status(400).json({ error: 'missing or invalid card year' });
  if (!tests.isValidCardCVV(cardCVV)) return res.status(400).json({ error: 'missing or invalid card CVV' });

  const text = `
    INSERT INTO "orders" ("cartId", "name", "addressOne", "addressTwo", "city", "state", "zipCode", "cardNumber", "cardMonth", "cardYear", "cardCVV")
    VALUES      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING   "orderId",
                "createdAt",
                "name",
                "addressOne",
                "addressTwo",
                "city",
                "state",
                "zipCode",
                "cardNumber",
                "cardMonth",
                "cardYear",
                "cardCVV"
  `;
  const values = [cartId, name, addressOne, addressTwo, city, state, zipCode, cardNumber, cardMonth, cardYear, cardCVV];
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

module.exports = app;
