const typeProperties = require('../utils/type-properties');


const retrieveTree = async ({ id, props }, { mc }, tree = []) => {
  const result = await mc.retrieveById('DataFolder', id, props);
  tree.push(result);
  if (result.ParentFolder && result.ParentFolder.ID && result.ParentFolder.ID !== '0') {
    await retrieveTree({
      id: result.ParentFolder.ID,
      props,
    }, { mc }, tree);
  }
  return tree.slice();
};

module.exports = {
  DataFolder: {
    parent: ({ ParentFolder }, _, { mc }, info) => {
      if (!ParentFolder || !ParentFolder.ID) return null;
      const props = typeProperties(info);
      return mc.retrieveById('DataFolder', ParentFolder.ID, props);
    },

    fullName: async (dataFolder, _, { mc }) => {
      const { Name, ParentFolder } = dataFolder;
      if (!ParentFolder || !ParentFolder.ID) return Name;

      const props = ['Name', 'ParentFolder.ID'];
      const tree = await retrieveTree({ id: ParentFolder.ID, props }, { mc }, [dataFolder]);
      return tree.map((df) => df.Name).reverse().join(' > ');
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
