const GraphQLJSON = require('graphql-type-json');
const { DateType } = require('../types');

module.exports = {
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
};
