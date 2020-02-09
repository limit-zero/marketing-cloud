module.exports = ({ prop, value, operator = 'equals' } = {}) => ({
  attributes: { 'xsi:type': 'SimpleFilterPart' },
  Property: prop,
  SimpleOperator: operator,
  Value: value,
});
