const gql = require('graphql-tag');
const send = require('./send');

module.exports = gql`

scalar Date
scalar JSON

directive @prop(name: String, needs: [String] = []) on FIELD_DEFINITION

type Query {
  ping: String!
}

type Mutation {
  ping: String!
}

${send}

`;
