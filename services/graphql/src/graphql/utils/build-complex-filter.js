module.exports = ({ left, right, operator } = {}) => ({
  attributes: { 'xsi:type': 'ComplexFilterPart' },
  LeftOperand: left,
  LogicalOperator: operator,
  RightOperand: right,
});
