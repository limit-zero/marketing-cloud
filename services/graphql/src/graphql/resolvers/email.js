const { get } = require('@parameter1/utils');
const typeProperties = require('../utils/type-properties');
const connectionProps = require('../utils/connection-properties');
const buildConnection = require('../utils/build-connection');
const buildInFilter = require('../utils/build-in-filter');
const buildSimpleFilter = require('../utils/build-simple-filter');
const { FUEL_API_ACCOUNT_ID } = require('../../env');

module.exports = {
  /**
   *
   */
  Email: {
    /**
     *
     */
    dataFolder: ({ CategoryID }, _, { soap }, info) => {
      if (!CategoryID) return null;
      const props = typeProperties(info);
      return soap.retrieveById('DataFolder', CategoryID, props);
    },

    /**
     *
     */
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
  EmailAsset: {
    /**
     *
     */
    categoryId: (asset) => get(asset, 'category.id'),

    /**
     *
     */
    clientId: () => FUEL_API_ACCOUNT_ID,

    /**
     *
     */
    dataFolder: (asset, _, { soap }, info) => {
      const id = get(asset, 'category.id');
      if (!id) return null;
      const props = typeProperties(info);
      return soap.retrieveById('DataFolder', id, props);
    },

    /**
     *
     */
    dataFolderId: (asset) => get(asset, 'category.id'),

    /**
     *
     */
    emailId: (asset) => get(asset, 'legacyData.legacyId'),

    /**
     *
     */
    html: (asset) => get(asset, 'views.html.content'),

    /**
     *
     */
    subject: (asset) => get(asset, 'views.subjectline.content'),
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

    emailAssets: async (_, { input }, { rest }) => {
      const body = {
        fields: ['name', 'views', 'category', 'createdDate', 'modifiedDate'],
        page: { pageSize: input.pageSize, page: input.page },
      };

      const {
        count,
        page,
        pageSize,
        items,
      } = await rest.request({ endpoint: '/asset/v1/content/assets/query', method: 'POST', body });

      const hasNextPage = count > (page * pageSize);
      return {
        edges: items,
        totalCount: count,
        pageInfo: {
          hasNextPage,
          nextPage: hasNextPage ? page + 1 : null,
        },
      };
    },
  },
};
