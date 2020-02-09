const buildSimpleFilter = require('./build-simple-filter');

module.exports = ({ prop, values } = {}) => {
  if (!values || !values.length) return null;
  if (values.length === 1) {
    return buildSimpleFilter({ prop, value: values[0] });
  }
  return buildSimpleFilter({ prop, value: values, operator: 'IN' });
};
