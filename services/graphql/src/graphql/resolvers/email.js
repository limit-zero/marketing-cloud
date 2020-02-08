const typeProperties = require('../utils/type-properties');

module.exports = {
  /**
   *
   */
  Query: {
    email: async (_, { input }, { mc }, info) => {
      const { id } = input;
      const props = typeProperties(info);
      const email = await mc.retrieveOne('Email', {
        attributes: { 'xsi:type': 'SimpleFilterPart' },
        Property: 'ID',
        SimpleOperator: 'equals',
        Value: id,
      }, props);
      if (!email) return null;
      return email;
    },
  },
};
