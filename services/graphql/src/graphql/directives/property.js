const { SchemaDirectiveVisitor } = require('graphql-tools');

class PropertyDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) {
    const { needs } = this.args;
    const name = this.args.name || field.name;

    // eslint-disable-next-line no-param-reassign
    field.properties = needs.reduce((arr, key) => {
      arr.push(key);
      return arr;
    }, [name]);

    if (!field.resolve) {
      // Add automatic property resolver when not specified.
      // eslint-disable-next-line no-param-reassign
      field.resolve = (obj) => obj[name];
    }
  }
}

module.exports = PropertyDirective;
