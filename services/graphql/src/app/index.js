const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const graphql = require('../graphql/server');

const app = express();
const proxies = ['loopback', 'linklocal', 'uniquelocal'];
app.set('trust proxy', proxies);

const CORS = cors({
  methods: ['GET', 'POST'],
  maxAge: 600,
});

app.use(helmet());
app.use(CORS);
app.options('*', CORS);

graphql({ app, path: '/' });

module.exports = app;
