const typeProperties = require('../utils/type-properties');

module.exports = {
  Send: {
    email: async ({ Email }, _, { mc }, info) => {
      if (!Email || !Email.ID) return null;
      const props = typeProperties(info);
      const email = await mc.retrieveOne('Email', {
        attributes: { 'xsi:type': 'SimpleFilterPart' },
        Property: 'ID',
        SimpleOperator: 'equals',
        Value: Email.ID,
      }, props);
      if (!email) return null;
      return email;
    },
  },

  /**
   *
   */
  Query: {
    send: async (_, { input }, { mc }, info) => {
      const { id } = input;
      const props = typeProperties(info);
      const send = await mc.retrieveOne('Send', {
        attributes: { 'xsi:type': 'SimpleFilterPart' },
        Property: 'ID',
        SimpleOperator: 'equals',
        Value: id,
      }, props);
      if (!send) return null;
      return send;
    },
  },
};
