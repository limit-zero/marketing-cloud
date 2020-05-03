module.exports = ({
  prop,
  value,
  operator = 'equals',
  isDate = false,
} = {}) => ({
  attributes: { 'xsi:type': 'SimpleFilterPart' },
  Property: prop,
  SimpleOperator: operator,
  ...(!isDate && { Value: value }),
  ...(isDate && { DateValue: (new Date(Date.parse(value))).toISOString() }),
});
