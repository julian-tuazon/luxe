const pg = require('pg');

const connectionString = process.env.NODE_ENV === 'test' ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL;

const db = new pg.Pool({ connectionString });

module.exports = db;
