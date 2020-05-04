const typeProperties = require('../utils/type-properties');
const connectionProps = require('../utils/connection-properties');
const buildConnection = require('../utils/build-connection');
const buildFilter = require('../utils/build-filter-from-input');

module.exports = {
  Subscriber: {
    attributes: ({ Attributes }) => (Array.isArray(Attributes) ? Attributes : []),
  },

  /**
   *
   */
  Query: {
    subscriber: (_, { input }, { soap }, info) => {
      const { id } = input;
      const props = typeProperties(info);
      return soap.retrieveById('Subscriber', id, props);
    },

    subscribers: async (_, { input }, { soap }, info) => {
      const { continueRequest } = input;
      if (continueRequest) {
        const nextBatch = await soap.continueRetrieve(continueRequest);
        return buildConnection(nextBatch);
      }
      const props = connectionProps(info);
      const Filter = buildFilter(input);
      const response = await soap.retrieve('Subscriber', props, { Filter });
      return buildConnection(response);
    },
  },
};
