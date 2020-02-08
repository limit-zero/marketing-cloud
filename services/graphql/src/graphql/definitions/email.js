const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  email(input: EmailQueryInput = {}): Email
}

type Email {
  id: Int! @prop(name: "ID")
  name: String! @prop(name: "Name")
  subject: String @prop(name: "Subject")
  status: String @prop(name: "Status")
  characterSet: String @prop(name: "CharacterSet")

  createdDate: Date @prop(name: "CreatedDate")
  modifiedDate: Date @prop(name: "ModifiedDate")
}

input EmailQueryInput {
  id: Int!
}

`;
