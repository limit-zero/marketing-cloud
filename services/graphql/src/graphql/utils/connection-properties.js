const { getAsArray } = require('@base-cms/object-path');
const getProperties = require('./get-properties');

module.exports = ({
  returnType,
  fieldNodes,
  schema,
  fragments,
}) => {
  let props;
  const { usePropsFrom } = returnType.ofType || returnType;
  if (usePropsFrom) {
    const edges = getAsArray(fieldNodes[0], 'selectionSet.selections').find((s) => s.name.value === 'edges');
    const node = getAsArray(edges, 'selectionSet.selections').find((s) => s.name.value === 'node');
    if (node) {
      // Project based on the node's selectionSet
      props = getProperties(
        schema,
        schema.getType(usePropsFrom),
        node.selectionSet,
        fragments,
      );
    } else {
      // Only return the ID since results weren't selected.
      props = ['ID'];
    }
  }
  return props;
};
