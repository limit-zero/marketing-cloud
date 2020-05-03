require('./newrelic');

const http = require('http');
const boot = require('./boot');
const newrelic = require('./newrelic');
const app = require('./app');
const pkg = require('../package.json');
const { INTERNAL_PORT, EXTERNAL_PORT } = require('./env');

process.on('unhandledRejection', (e) => {
  newrelic.noticeError(e);
  throw e;
});

boot({
  name: pkg.name,
  version: pkg.version,
  server: http.createServer(app),
  port: INTERNAL_PORT,
  exposedPort: EXTERNAL_PORT,
  onError: newrelic.noticeError.bind(newrelic),
}).catch((e) => setImmediate(() => {
  newrelic.noticeError(e);
  throw e;
}));
