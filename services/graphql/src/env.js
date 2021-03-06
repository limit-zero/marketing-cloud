const {
  bool,
  cleanEnv,
  port,
  num,
  str,
} = require('envalid');

module.exports = cleanEnv(process.env, {
  EXTERNAL_PORT: port({ desc: 'The external port that the server is exposed on.', default: 80 }),
  INTERNAL_PORT: port({ desc: 'The internal port that the server will run on.', default: 80 }),
  FUEL_API_AUTH_URL: str({ desc: 'The authentication base URI' }),
  FUEL_API_CLIENT_ID: str({ desc: 'The Marketing Cloud API client ID.' }),
  FUEL_API_CLIENT_SECRET: str({ desc: 'The Marketing Cloud API client secret.' }),
  FUEL_API_ACCOUNT_ID: num({ desc: 'Optional account identifier of the target business unit', default: undefined }),
  NEW_RELIC_ENABLED: bool({ desc: 'Whether New Relic is enabled.', default: true, devDefault: false }),
  NEW_RELIC_LICENSE_KEY: str({ desc: 'The license key for New Relic.', devDefault: '(unset)' }),
  TERMINUS_TIMEOUT: num({ desc: 'Number of milliseconds before forceful exiting.', default: 1000 }),
  TERMINUS_SHUTDOWN_DELAY: num({ desc: 'Number of milliseconds before the HTTP server starts its shutdown.', default: 10000 }),
});
