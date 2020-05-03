/* eslint-disable no-param-reassign */
const { SchemaDirectiveVisitor } = require('apollo-server-express');

class UsePropsFromDirective extends SchemaDirectiveVisitor {
  visitObject(object) {
    const { type } = this.args;
    object.usePropsFrom = type;
  }
}

module.exports = UsePropsFromDirective;
