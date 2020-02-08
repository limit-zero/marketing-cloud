const { ApolloServer } = require('apollo-server-express');
const schema = require('./schema');
const mc = require('../mc');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = ({ app, path }) => {
  const server = new ApolloServer({
    schema,
    context: () => ({ mc }),
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
