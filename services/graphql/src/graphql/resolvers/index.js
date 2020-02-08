const GraphQLJSON = require('graphql-type-json');
const merge = require('lodash.merge');
const { DateType } = require('../types');
const email = require('./email');
const send = require('./send');

module.exports = merge(
  email,
  send,
  {
    /**
     * Custom scalar types.
     */
    Date: DateType,
    JSON: GraphQLJSON,

    /**
     * Root queries.
     */
    Query: {
      /**
       *
       */
      ping: () => 'pong',
    },

    /**
     * Root mutations.
     */
    Mutation: {
      /**
       *
       */
      ping: () => 'pong',
    },
  },
);
