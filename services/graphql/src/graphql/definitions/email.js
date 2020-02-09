const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  email(input: EmailQueryInput = {}): Email
  emails(input: EmailsQueryInput = {}): EmailConnection!
}

type Email implements ClientIdentifiable @applyInterfaceFields {
  id: Int! @prop(name: "ID")
  name: String! @prop(name: "Name")
  subject: String @prop(name: "Subject")
  status: String @prop(name: "Status")
  characterSet: String @prop(name: "CharacterSet")

  createdDate: Date @prop(name: "CreatedDate")
  modifiedDate: Date @prop(name: "ModifiedDate")
}

type EmailConnection @usePropsFrom(type: "Email") {
  edges: [EmailEdge]!
  pageInfo: PageInfo!
}

type EmailEdge {
  node: Email!
}

input EmailQueryInput {
  id: Int!
}

input EmailsQueryInput {
  "Email IDs to return. Will do an IN query."
  ids: [Int] = []
  "A previous request ID to finish processing. All other input will be ignored."
  continueRequest: String
}

`;
