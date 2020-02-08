const typeProperties = require('../utils/type-properties');

module.exports = {
  /**
   *
   */
  Query: {
    clickEventsForSend: async (_, { input }, { mc }, info) => {
      const { sendId } = input;
      const props = typeProperties(info);
      const Filter = {
        attributes: { 'xsi:type': 'SimpleFilterPart' },
        Property: 'SendID',
        SimpleOperator: 'equals',
        Value: sendId,
      };
      const { Results } = await mc.retrieve('ClickEvent', props, { Filter });
      return Results;
    },
  },
};
