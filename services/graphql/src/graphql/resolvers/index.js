const GraphQLJSON = require('graphql-type-json');
const merge = require('lodash.merge');
const { DateType } = require('../types');
const clickEvent = require('./click-event');
const dataExtension = require('./data-extension');
const dataFolder = require('./data-folder');
const email = require('./email');
const linkSend = require('./link-send');
const send = require('./send');
const subscriber = require('./subscriber');

module.exports = merge(
  clickEvent,
  dataExtension,
  dataFolder,
  email,
  linkSend,
  send,
  subscriber,
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

      /**
       *
       */
      validateEmailAddress: async (_, { input }, { rest }) => {
        const { email: address, validators } = input;
        const body = { email: address, validators };
        const json = await rest.request({ endpoint: '/address/v1/validateEmail', method: 'POST', body });
        return json.valid;
      },
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
