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
      if (data.rows.length === 0) return next(new ClientError(`productId ${req.params.productId} does not exist`, 404));
      return res.json(data.rows[0]);
    })
    .catch(err => next(err));
});

app.get('/api/cart/', (req, res, next) => {
  if (!(/(?!^0)(^\d+$)/.test(req.params.productId))) return res.status(400).json({ error: 'please enter a positive integer productId' });
  const text = `
    SELECT *
      FROM "products"
     WHERE "productId" = $1
  `;
  const values = [req.params.productId];
  db.query(text, values)
    .then(data => {
      if (data.rows.length === 0) return next(new ClientError(`productId ${req.params.productId} does not exist`, 404));
      return res.json(data.rows[0]);
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
