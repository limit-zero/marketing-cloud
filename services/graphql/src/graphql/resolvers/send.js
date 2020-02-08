const typeProperties = require('../utils/type-properties');

module.exports = {
  Send: {
    email: ({ Email }, _, { mc }, info) => {
      if (!Email || !Email.ID) return null;
      const props = typeProperties(info);
      return mc.retrieveById('Email', Email.ID, props);
    },
  },

  /**
   *
   */
  Query: {
    send: (_, { input }, { mc }, info) => {
      const { id } = input;
      const props = typeProperties(info);
      return mc.retrieveById('Send', id, props);
    },
  },
};
