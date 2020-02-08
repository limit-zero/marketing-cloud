const typeProperties = require('../utils/type-properties');
const findById = require('../utils/find-by-id');

module.exports = {
  Send: {
    email: async ({ Email }, _, { mc }, info) => {
      if (!Email || !Email.ID) return null;
      const props = typeProperties(info);
      return findById('Email', { id: Email.ID, props, mc });
    },
  },

  /**
   *
   */
  Query: {
    send: (_, { input }, { mc }, info) => {
      const { id } = input;
      const props = typeProperties(info);
      return findById('Send', { id, props, mc });
    },
  },
};
