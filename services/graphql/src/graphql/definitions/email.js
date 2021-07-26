const { gql } = require('apollo-server-express');

module.exports = gql`

extend type Query {
  email(input: EmailQueryInput = {}): Email
  emails(input: EmailsQueryInput = {}): EmailConnection!
  emailAssets(input: EmailAssetsQueryInput = {}): EmailAssetsConnection!
}

type Email implements ClientIdentifiable @applyInterfaceFields {
  id: Int! @prop(name: "ID")
  name: String! @prop(name: "Name")
  subject: String @prop(name: "Subject")
  status: String @prop(name: "Status")
  characterSet: String @prop(name: "CharacterSet")
  categoryId: Int @prop(name: "CategoryID")
  dataFolderId: Int @prop(name: "CategoryID")

  createdDate: Date @prop(name: "CreatedDate")
  modifiedDate: Date @prop(name: "ModifiedDate")

  dataFolder: DataFolder @prop(name: "CategoryID")
  sends(input: EmailSendsInput = {}): SendConnection! @prop(name: "ID")

  html: String @prop(name: "HTMLBody")
}

type EmailAsset {
  id: Int!
  clientId: Int!
  emailId: Int!
  name: String!
  subject: String

  categoryId: Int
  dataFolderId: Int

  createdDate: Date
  modifiedDate: Date

  html: String

  dataFolder: DataFolder
}

type EmailAssetsConnection {
  edges: [EmailAsset!]!
  totalCount: Int!
  pageInfo: EmailAssetsResponsePageInfo!
}

type EmailAssetsResponsePageInfo {
  nextPage: Int
  hasNextPage: Boolean!
}

type EmailConnection @usePropsFrom(type: "Email") {
  edges: [EmailEdge]!
  pageInfo: PageInfo!
}

type EmailEdge {
  node: Email!
}

input EmailAssetsQueryInput {
  page: Int = 1
  pageSize: Int = 50
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

input EmailSendsInput {
  "A previous request ID to finish processing. All other input will be ignored."
  continueRequest: String
}

`;
