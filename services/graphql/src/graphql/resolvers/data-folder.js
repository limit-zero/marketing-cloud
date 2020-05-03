const typeProperties = require('../utils/type-properties');


const retrieveTree = async ({ id, props }, { soap }, tree = []) => {
  const result = await soap.retrieveById('DataFolder', id, props);
  tree.push(result);
  if (result.ParentFolder && result.ParentFolder.ID && result.ParentFolder.ID !== '0') {
    await retrieveTree({
      id: result.ParentFolder.ID,
      props,
    }, { soap }, tree);
  }
  return tree.slice();
};

module.exports = {
  DataFolder: {
    parent: ({ ParentFolder }, _, { soap }, info) => {
      if (!ParentFolder || !ParentFolder.ID) return null;
      const props = typeProperties(info);
      return soap.retrieveById('DataFolder', ParentFolder.ID, props);
    },

    fullName: async (dataFolder, _, { soap }) => {
      const { Name, ParentFolder } = dataFolder;
      if (!ParentFolder || !ParentFolder.ID) return Name;

      const props = ['Name', 'ParentFolder.ID'];
      const tree = await retrieveTree({ id: ParentFolder.ID, props }, { soap }, [dataFolder]);
      return tree.map((df) => df.Name).reverse().join(' > ');
    },
  },

  /**
   *
   */
  Query: {
    dataFolder: (_, { input }, { soap }, info) => {
      const { id } = input;
      const props = typeProperties(info);
      return soap.retrieveById('DataFolder', id, props);
    },
  },
};
