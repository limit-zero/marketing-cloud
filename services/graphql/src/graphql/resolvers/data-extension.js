const { UserInputError } = require('apollo-server-express');
const { get } = require('@marketing-cloud/utils');
const checkOrInput = require('../utils/check-or-input');
const typeProperties = require('../utils/type-properties');
const buildConnection = require('../utils/build-connection');
const connectionProps = require('../utils/connection-properties');
const simpleFilter = require('../utils/build-simple-filter');
const buildFilter = require('../utils/build-filter-from-input');

module.exports = {
  /**
   *
   */
  DataExtension: {
    dataFolder: ({ CategoryID }, _, { soap }, info) => {
      if (!CategoryID) return null;
      const props = typeProperties(info);
      return soap.retrieveById('DataFolder', CategoryID, props);
    },

    async objects({ CustomerKey }, { input }, { soap }) {
      const { props, continueRequest } = input;
      if (continueRequest) {
        const nextBatch = await soap.continueRetrieve(continueRequest);
        return buildConnection(nextBatch);
      }
      const Filter = buildFilter(input);
      const response = await soap.retrieve(`DataExtensionObject[${CustomerKey}]`, props, { Filter });
      return buildConnection(response);
    },

    async fields({ CustomerKey }, { input }, { soap }, info) {
      const { continueRequest } = input;
      if (continueRequest) {
        const nextBatch = await soap.continueRetrieve(continueRequest);
        return buildConnection(nextBatch);
      }
      const props = connectionProps(info);
      const Filter = simpleFilter({ prop: 'DataExtension.CustomerKey', value: CustomerKey });
      const response = await soap.retrieve('DataExtensionField', props, { Filter });
      return buildConnection(response);
    },
  },

  DataExtensionObject: {
    properties({ Properties }) {
      return Properties.Property;
    },
  },

  /**
   *
   */
  Query: {
    /**
     *
     */
    dataExtension: async (_, { input }, { soap }, info) => {
      checkOrInput({ input, keys: ['objectId', 'customerKey'] });
      const { objectId, customerKey } = input;
      const props = typeProperties(info);
      if (objectId) return soap.retrieveByObjectId('DataExtension', objectId, props);
      return soap.retrieveByCustomerKey('DataExtension', customerKey, props);
    },

    /**
     *
     */
    dataExtensions: async (_, { input }, { soap }, info) => {
      const { continueRequest } = input;
      if (continueRequest) {
        const nextBatch = await soap.continueRetrieve(continueRequest);
        return buildConnection(nextBatch);
      }
      const Filter = buildFilter(input);
      const props = connectionProps(info);
      const response = await soap.retrieve('DataExtension', props, { Filter });
      return buildConnection(response);
    },

    /**
     *
     */
    async dataExtensionFields(_, { input }, { soap }, info) {
      const { customerKey, continueRequest } = input;
      if (continueRequest) {
        const nextBatch = await soap.continueRetrieve(continueRequest);
        return buildConnection(nextBatch);
      }
      const props = connectionProps(info);
      const Filter = simpleFilter({ prop: 'DataExtension.CustomerKey', value: customerKey });
      const response = await soap.retrieve('DataExtensionField', props, { Filter });
      return buildConnection(response);
    },

    /**
     *
     */
    async dataExtensionObjects(_, { input }, { soap }) {
      const { customerKey, props, continueRequest } = input;
      if (continueRequest) {
        const nextBatch = await soap.continueRetrieve(continueRequest);
        return buildConnection(nextBatch);
      }
      const Filter = buildFilter(input);
      const response = await soap.retrieve(`DataExtensionObject[${customerKey}]`, props, { Filter });
      return buildConnection(response);
    },
  },

  /**
   *
   */
  Mutation: {
    refreshDataExtension: async (_, { input }, { soap, rest }) => {
      const { objectId, customerKey } = input;
      if (!objectId && !customerKey) throw new UserInputError('Either the objectId or the customerKey input must be provided.');
      if (objectId && customerKey) throw new UserInputError('You cannot provide both the objectId and customerKey as input.');

      let id = objectId;
      if (customerKey) {
        const extension = await soap.retrieveByCustomerKey('DataExtension', customerKey, ['ObjectID']);
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
