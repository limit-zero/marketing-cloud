const typeProperties = require('../utils/type-properties');
const connectionProps = require('../utils/connection-properties');
const buildConnection = require('../utils/build-connection');
const buildInFilter = require('../utils/build-in-filter');
const buildSimpleFilter = require('../utils/build-simple-filter');

module.exports = {
  /**
   *
   */
  Email: {
    sends: async ({ ID }, { input }, { mc }, info) => {
      const { continueRequest } = input;
      if (continueRequest) {
        const nextBatch = await mc.continueRetrieve(continueRequest);
        return buildConnection(nextBatch);
      }
      const props = connectionProps(info);
      const Filter = buildSimpleFilter({ prop: 'Email.ID', value: ID });
      const response = await mc.retrieve('Send', props, { Filter });
      return buildConnection(response);
    },
  },

  /**
   *
   */
  Query: {
    email: async (_, { input }, { mc }, info) => {
      const { id } = input;
      const props = typeProperties(info);
      return mc.retrieveById('Email', id, props);
    },

    emails: async (_, { input }, { mc }, info) => {
      const { continueRequest, ids } = input;
      if (continueRequest) {
        const nextBatch = await mc.continueRetrieve(continueRequest);
        return buildConnection(nextBatch);
      }
      const props = connectionProps(info);
      const Filter = buildInFilter({ prop: 'ID', values: ids });
      const options = { ...(Filter && { Filter }) };
      const response = await mc.retrieve('Email', props, options);
      return buildConnection(response);
    },
  },
};
