const GraphQLJSON = require('graphql-type-json');
const merge = require('lodash.merge');
const { DateType } = require('../types');
const clickEvent = require('./click-event');
const dataFolder = require('./data-folder');
const email = require('./email');
const linkSend = require('./link-send');
const send = require('./send');

module.exports = merge(
  clickEvent,
  dataFolder,
  email,
  linkSend,
  send,
  {
    /**
     * Custom scalar types.
     */
    Date: DateType,
    JSON: GraphQLJSON,

    ClientIdentifiable: {
      __resolveType: ({ type }) => type,
    },

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
