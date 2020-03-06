const typeProperties = require('../utils/type-properties');
const buildConnection = require('../utils/build-connection');
const connectionProps = require('../utils/connection-properties');

module.exports = {
  /**
   *
   */
  DataExtension: {
    dataFolder: ({ CategoryID }, _, { mc }, info) => {
      if (!CategoryID) return null;
      const props = typeProperties(info);
      return mc.retrieveById('DataFolder', CategoryID, props);
    },
  },

  /**
   *
   */
  Query: {
    /**
     *
     */
    dataExtension: async (_, { input }, { mc }, info) => {
      const { objectId } = input;
      const props = typeProperties(info);
      return mc.retrieveByObjectId('DataExtension', objectId, props);
    },

    /**
     *
     */
    dataExtensions: async (_, { input }, { mc }, info) => {
      const { continueRequest } = input;
      if (continueRequest) {
        const nextBatch = await mc.continueRetrieve(continueRequest);
        return buildConnection(nextBatch);
      }
      const props = connectionProps(info);
      const response = await mc.retrieve('DataExtension', props);
      return buildConnection(response);
    },
  },
};
