const gql = require('graphql-tag');

module.exports = gql`

scalar Date
scalar JSON

type Query {
  ping: String!
}

type Mutation {
  ping: String!
}

`;
