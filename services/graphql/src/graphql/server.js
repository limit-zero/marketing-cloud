const { ApolloServer } = require('apollo-server-express');
const schema = require('./schema');
const soap = require('../soap');
const rest = require('../rest');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = ({ app, path }) => {
  const server = new ApolloServer({
    schema,
    context: () => ({ soap, rest }),
    // Enable in production
    tracing: false,
    cacheControl: false,
    // Enable in dev
    introspection: true,
    debug: !isProduction,
    playground: !isProduction ? { endpoint: path } : false,
  });
  server.applyMiddleware({ app, path });
};
