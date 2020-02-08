const typeProperties = require('../utils/type-properties');

module.exports = {
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
