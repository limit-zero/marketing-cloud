const typeProperties = require('../utils/type-properties');

module.exports = {
  DataFolder: {
    parent: ({ ParentFolder }, _, { mc }, info) => {
      if (!ParentFolder || !ParentFolder.ID) return null;
      const props = typeProperties(info);
      return mc.retrieveById('DataFolder', ParentFolder.ID, props);
    },
  },

  /**
   *
   */
  Query: {
    dataFolder: (_, { input }, { mc }, info) => {
      const { id } = input;
      const props = typeProperties(info);
      return mc.retrieveById('DataFolder', id, props);
    },
  },
};
