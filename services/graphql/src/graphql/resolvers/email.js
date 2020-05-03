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
    sends: async ({ ID }, { input }, { soap }, info) => {
      const { continueRequest } = input;
      if (continueRequest) {
        const nextBatch = await soap.continueRetrieve(continueRequest);
        return buildConnection(nextBatch);
      }
      const props = connectionProps(info);
      const Filter = buildSimpleFilter({ prop: 'Email.ID', value: ID });
      const response = await soap.retrieve('Send', props, { Filter });
      return buildConnection(response);
    },
  },

  /**
   *
   */
  Query: {
    email: async (_, { input }, { soap }, info) => {
      const { id } = input;
      const props = typeProperties(info);
      return soap.retrieveById('Email', id, props);
    },

    emails: async (_, { input }, { soap }, info) => {
      const { continueRequest, ids } = input;
      if (continueRequest) {
        const nextBatch = await soap.continueRetrieve(continueRequest);
        return buildConnection(nextBatch);
      }
      const props = connectionProps(info);
      const Filter = buildInFilter({ prop: 'ID', values: ids });
      const options = { ...(Filter && { Filter }) };
      const response = await soap.retrieve('Email', props, options);
      return buildConnection(response);
    },
  },
};
