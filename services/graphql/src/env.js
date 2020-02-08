const {
  cleanEnv,
  validators,
  port,
  num,
} = require('@base-cms/env');

const { nonemptystr } = validators;

module.exports = cleanEnv(process.env, {
  EXTERNAL_PORT: port({ desc: 'The external port that the server is exposed on.', default: 80 }),
  INTERNAL_PORT: port({ desc: 'The internal port that the server will run on.', default: 80 }),
  FUEL_API_AUTH_URL: nonemptystr({ desc: 'The authentication base URI' }),
  FUEL_API_CLIENT_ID: nonemptystr({ desc: 'The Marketing Cloud API client ID.' }),
  FUEL_API_CLIENT_SECRET: nonemptystr({ desc: 'The Marketing Cloud API client secret.' }),
  FUEL_API_ACCOUNT_ID: num({ desc: 'Optional account identifier of the target business unit', default: undefined }),
});
