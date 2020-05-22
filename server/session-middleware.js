const path = require('path');
const expressSession = require('express-session');
const sessionFileStore = require('session-file-store');

const FileStore = sessionFileStore(expressSession);

let store = new FileStore({
  retries: 0,
  ttl: 28800,
  path: path.join(__dirname, 'sessions/')
});

if (process.env.NODE_ENV === 'test') store = null;

const sessionMiddleware = expressSession({
  cookie: {
    sameSite: true
  },
  resave: false,
  rolling: true,
  store,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET
});

module.exports = sessionMiddleware;
