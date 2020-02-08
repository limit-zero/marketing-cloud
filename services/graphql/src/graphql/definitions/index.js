const gql = require('graphql-tag');
const send = require('./send');

module.exports = gql`

scalar Date
scalar JSON

type Query {
  ping: String!
}

type Mutation {
  ping: String!
}

${send}

`;
