const { UserInputError } = require('apollo-server-express');
const { get } = require('@marketing-cloud/utils');
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
      const { objectId, customerKey } = input;
      if (!objectId && !customerKey) throw new UserInputError('Either the objectId or the customerKey input must be provided.');
      if (objectId && customerKey) throw new UserInputError('You cannot provide both the objectId and customerKey as input.');

      const props = typeProperties(info);
      if (objectId) return mc.retrieveByObjectId('DataExtension', objectId, props);
      return mc.retrieveByCustomerKey('DataExtension', customerKey, props);
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

  /**
   *
   */
  Mutation: {
    refreshDataExtension: async (_, { input }, { mc, rest }) => {
      const { objectId, customerKey } = input;
      if (!objectId && !customerKey) throw new UserInputError('Either the objectId or the customerKey input must be provided.');
      if (objectId && customerKey) throw new UserInputError('You cannot provide both the objectId and customerKey as input.');

      let id = objectId;
      if (customerKey) {
        const extension = await mc.retrieveByCustomerKey('DataExtension', customerKey, ['ObjectID']);
        if (!extension) return false;
        id = extension.ObjectID;
      }
      const response = await rest.request({
        endpoint: `/email/v1/filteredCustomObjects/${id}/refresh`,
        method: 'POST',
      });
      if (get(response, 'filterActivityInstance.asyncID')) return true;
      return false;
    },
  },
};
