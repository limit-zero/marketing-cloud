const { gql } = require('apollo-server-express');

module.exports = gql`

input SimpleFilterPartInput {
  prop: String!
  operator: SimpleOperator!
  value: [String!] = []
  "When true, the \`value\` input should be a parsable date string, preferably with a timezone, e.g. \`2016-02-01T18:27:05.000-0600\`"
  isDate: Boolean = false
}

input ComplexFilterPartInput {
  left: SimpleFilterPartInput!
  operator: LogicalOperator!
  right: SimpleFilterPartInput!
}

input FilterInput {
  simple: SimpleFilterPartInput
  complex: ComplexFilterPartInput
}

`;
