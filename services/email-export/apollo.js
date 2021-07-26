const fetch = require('node-fetch');
const { ApolloClient } = require('apollo-client');
const { InMemoryCache } = require('apollo-cache-inmemory');
const { createHttpLink } = require('apollo-link-http');

module.exports = () => new ApolloClient({
  connectToDevTools: false,
  ssrMode: true,
  link: createHttpLink({
    fetch,
    uri: process.env.GRAPHQL_URL,
  }),
  cache: new InMemoryCache(),
});
