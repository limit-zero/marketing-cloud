const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  send(input: SendQueryInput = {}): Send
}

type Send {
  id: Int!
  emailName: String!
  subject: String
  previewUrl: String
  status: String
  sentDate: Date
  createdDate: Date
  modifiedDate: Date
}

input SendQueryInput {
  id: Int!
}

`;
