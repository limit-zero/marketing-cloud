const typeProperties = require('../utils/type-properties');
const connectionProps = require('../utils/connection-properties');
const buildConnection = require('../utils/build-connection');

module.exports = {
  Send: {
    email: ({ Email }, _, { mc }, info) => {
      if (!Email || !Email.ID) return null;
      const props = typeProperties(info);
      return mc.retrieveById('Email', Email.ID, props);
    },

    links: async ({ ID }, _, { mc }, info) => {
      const props = typeProperties(info);
      const Filter = {
        attributes: { 'xsi:type': 'SimpleFilterPart' },
        Property: 'SendID',
        SimpleOperator: 'equals',
        Value: ID,
      };
      const { Results } = await mc.retrieve('LinkSend', props, { Filter });
      return Results;
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

    sends: async (_, { input }, { mc }, info) => {
      const { continueRequest, ids } = input;
      const props = connectionProps(info);
      if (continueRequest) {
        const nextBatch = await mc.continueRetrieve(continueRequest);
        return buildConnection(nextBatch);
      }
      const options = {};
      if (ids.length) {
        // Only return the specified sends.
        options.Filter = {
          attributes: { 'xsi:type': 'SimpleFilterPart' },
          Property: 'ID',
          SimpleOperator: ids.length === 1 ? 'equals' : 'IN',
          Value: ids.length === 1 ? ids[0] : ids,
        };
      }
      const response = await mc.retrieve('Send', props, options);
      return buildConnection(response);
    },
  },
};
