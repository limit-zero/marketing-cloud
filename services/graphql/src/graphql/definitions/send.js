const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  send(input: SendQueryInput = {}): Send
}

type Send {
  id: Int! @prop(name: "ID")
  emailName: String! @prop(name: "EmailName")
  subject: String @prop(name: "Subject")
  previewUrl: String @prop(name: "PreviewURL")
  status: String @prop(name: "Status")
  sentDate: Date @prop(name: "SentDate")
  createdDate: Date @prop(name: "CreatedDate")
  modifiedDate: Date @prop(name: "ModifiedDate")
}

input SendQueryInput {
  id: Int!
}

`;
