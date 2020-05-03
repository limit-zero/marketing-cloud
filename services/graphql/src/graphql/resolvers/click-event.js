const connectionProps = require('../utils/connection-properties');
const buildConnection = require('../utils/build-connection');
const buildSimpleFilter = require('../utils/build-simple-filter');

module.exports = {
  /**
   *
   */
  Query: {
    clickEventsForSend: async (_, { input }, { soap }, info) => {
      const { sendId, continueRequest } = input;
      if (continueRequest) {
        const nextBatch = await soap.continueRetrieve(continueRequest);
        return buildConnection(nextBatch);
      }
      const props = connectionProps(info);
      const Filter = buildSimpleFilter({ prop: 'SendID', value: sendId });
      const response = await soap.retrieve('ClickEvent', props, { Filter });
      return buildConnection(response);
    },
  },
};
