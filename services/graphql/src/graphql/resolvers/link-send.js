const typeProperties = require('../utils/type-properties');
const buildComplexFilter = require('../utils/build-complex-filter');
const buildSimpleFilter = require('../utils/build-simple-filter');

module.exports = {
  LinkSend: {
    clickEvents: async ({ ID, SendID }, _, { soap }, info) => {
      const props = typeProperties(info);
      const Filter = buildComplexFilter({
        left: buildSimpleFilter({ prop: 'SendId', value: SendID }),
        right: buildSimpleFilter({ prop: 'URLID', value: ID }),
        operator: 'AND',
      });
      const { Results } = await soap.retrieve('ClickEvent', props, { Filter });
      return Results;
    },
  },

  /**
   *
   */
  Query: {
    linkSend: async (_, { input }, { soap }, info) => {
      const { id } = input;
      const props = typeProperties(info);
      return soap.retrieveById('LinkSend', id, props);
    },
    linksForSend: async (_, { input }, { soap }, info) => {
      const { sendId } = input;
      const props = typeProperties(info);
      const Filter = {
        attributes: { 'xsi:type': 'SimpleFilterPart' },
        Property: 'SendID',
        SimpleOperator: 'equals',
        Value: sendId,
      };
      const { Results } = await soap.retrieve('LinkSend', props, { Filter });
      return Results;
    },
  },
};
