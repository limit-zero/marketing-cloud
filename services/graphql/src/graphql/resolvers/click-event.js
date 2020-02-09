const connectionProps = require('../utils/connection-properties');
const buildConnection = require('../utils/build-connection');
const buildSimpleFilter = require('../utils/build-simple-filter');

module.exports = {
  /**
   *
   */
  Query: {
    clickEventsForSend: async (_, { input }, { mc }, info) => {
      const { sendId, continueRequest } = input;
      if (continueRequest) {
        const nextBatch = await mc.continueRetrieve(continueRequest);
        return buildConnection(nextBatch);
      }
      const props = connectionProps(info);
      const Filter = buildSimpleFilter({ prop: 'SendID', value: sendId });
      const response = await mc.retrieve('ClickEvent', props, { Filter });
      return buildConnection(response);
    },
  },
};
