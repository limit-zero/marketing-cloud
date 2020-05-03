const typeProperties = require('../utils/type-properties');
const connectionProps = require('../utils/connection-properties');
const buildConnection = require('../utils/build-connection');
const buildInFilter = require('../utils/build-in-filter');

module.exports = {
  Subscriber: {
    attributes: ({ Attributes }) => Attributes,
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
      const { continueRequest, ids } = input;
      if (continueRequest) {
        const nextBatch = await soap.continueRetrieve(continueRequest);
        return buildConnection(nextBatch);
      }
      const props = connectionProps(info);
      const Filter = buildInFilter({ prop: 'ID', values: ids });
      const options = { ...(Filter && { Filter }) };
      const response = await soap.retrieve('Subscriber', props, options);
      return buildConnection(response);
    },
  },
};
