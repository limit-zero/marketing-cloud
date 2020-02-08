const typeProperties = require('../utils/type-properties');

module.exports = {
  LinkSend: {
    clickEvents: async ({ ID, SendID }, _, { mc }, info) => {
      const props = typeProperties(info);

      const LeftOperand = {
        attributes: { 'xsi:type': 'SimpleFilterPart' },
        Property: 'SendId',
        SimpleOperator: 'equals',
        Value: SendID,
      };

      const RightOperand = {
        attributes: { 'xsi:type': 'SimpleFilterPart' },
        Property: 'URLID',
        SimpleOperator: 'equals',
        Value: ID,
      };

      const Filter = {
        attributes: { 'xsi:type': 'ComplexFilterPart' },
        LeftOperand,
        LogicalOperator: 'AND',
        RightOperand,
      };
      const { Results } = await mc.retrieve('ClickEvent', props, { Filter });
      return Results;
    },
  },

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
