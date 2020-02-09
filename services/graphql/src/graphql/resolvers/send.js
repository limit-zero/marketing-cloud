const typeProperties = require('../utils/type-properties');
const connectionProps = require('../utils/connection-properties');
const buildConnection = require('../utils/build-connection');
const buildInFilter = require('../utils/build-in-filter');
const buildComplexFilter = require('../utils/build-complex-filter');

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
      const { continueRequest, ids, emailIds } = input;
      const props = connectionProps(info);
      if (continueRequest) {
        const nextBatch = await mc.continueRetrieve(continueRequest);
        return buildConnection(nextBatch);
      }
      const options = {};
      const sendFilter = buildInFilter({ prop: 'ID', values: ids });
      const emailFilter = buildInFilter({ prop: 'Email.ID', values: emailIds });
      if (sendFilter && emailFilter) {
        options.Filter = buildComplexFilter({ left: sendFilter, right: emailFilter, operator: 'OR' });
      } else if (sendFilter) {
        options.Filter = sendFilter;
      } else if (emailFilter) {
        options.Filter = emailFilter;
      }
      const response = await mc.retrieve('Send', props, options);
      return buildConnection(response);
    },
  },
};
