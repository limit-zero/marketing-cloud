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
      const { continueRequest } = input;
      const props = connectionProps(info);
      const response = continueRequest ? await mc.continueRetrieve(continueRequest) : await mc.retrieve('Send', props);
      return buildConnection(response);
    },
  },
};
