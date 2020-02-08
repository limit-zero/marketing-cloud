const typeProperties = require('../utils/type-properties');

module.exports = {
  /**
   *
   */
  Query: {
    linkSend: async (_, { input }, { mc }, info) => {
      const { id } = input;
      const props = typeProperties(info);
      return mc.retrieveById('LinkSend', id, props);
    },
    linksForSend: async (_, { input }, { mc }, info) => {
      const { sendId } = input;
      const props = typeProperties(info);
      const Filter = {
        attributes: { 'xsi:type': 'SimpleFilterPart' },
        Property: 'SendID',
        SimpleOperator: 'equals',
        Value: sendId,
      };
      const { Results } = await mc.retrieve('LinkSend', props, { Filter });
      return Results;
    },
  },
};
