module.exports = async (type, { id, mc, props }) => {
  const obj = await mc.retrieveOne(type, {
    attributes: { 'xsi:type': 'SimpleFilterPart' },
    Property: 'ID',
    SimpleOperator: 'equals',
    Value: id,
  }, props);
  if (!obj) return null;
  return obj;
};
