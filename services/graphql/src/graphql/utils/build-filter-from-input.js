const simpleFilter = require('./build-simple-filter');
const complexFilter = require('./build-complex-filter');

module.exports = ({ filter = {} } = {}) => {
  const { simple, complex } = filter;
  if (!simple && !complex) return undefined;
  if (simple) return simpleFilter(simple);
  const left = simpleFilter(complex.left);
  const right = simpleFilter(complex.right);
  return complexFilter({ left, right, operator: complex.operator });
};
