const ApplyInterfaceDirective = require('./apply-interface');
const PropertyDirective = require('./property');
const UsePropsFromDirective = require('./use-props-from');

module.exports = {
  applyInterfaceFields: ApplyInterfaceDirective,
  prop: PropertyDirective,
  usePropsFrom: UsePropsFromDirective,
};
