const getProperties = require('./get-properties');

module.exports = (info) => {
  const {
    returnType,
    fieldNodes,
    schema,
    fragments,
  } = info;
  return getProperties(schema, returnType, fieldNodes[0].selectionSet, fragments);
};
