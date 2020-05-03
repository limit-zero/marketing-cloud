const { gql } = require('apollo-server-express');

module.exports = gql`

extend type Query {
  dataExtension(input: DataExtensionQueryInput!): DataExtension
  dataExtensions(input: DataExtensionsQueryInput = {}): DataExtensionConnection!
}

extend type Mutation {
  refreshDataExtension(input: RefreshDataExtensionQueryInput!): Boolean!
}

type DataExtension implements ClientIdentifiable @applyInterfaceFields {
  id: String! @prop(name: "ObjectID")
  customerKey: String @prop(name: "CustomerKey")
  name: String! @prop(name: "Name")
  description: String @prop(name: "Description")

  isSendable: Boolean @prop(name: "IsSendable")
  isTestable: Boolean @prop(name: "IsTestable")
  status: String @prop(name: "Status")

  dataFolderId: Int @prop(name: "CategoryID")
  dataFolder: DataFolder @prop(name: "CategoryID")
}

type DataExtensionConnection @usePropsFrom(type: "DataExtension") {
  edges: [DataExtensionEdge]!
  pageInfo: PageInfo!
}

type DataExtensionEdge {
  node: DataExtension!
}

"You must provide either an \`objectId\` or a \`customerKey\` (but not both)."
input DataExtensionQueryInput {
  "The ObjectID of the Data Extension to retrieve."
  objectId: String
  "The Customer (External) Key of the Data Extension to retrieve."
  customerKey: String
}

input DataExtensionsQueryInput {
  "A previous request ID to finish processing. All other input will be ignored."
  continueRequest: String
}

"You must provide either an \`objectId\` or a \`customerKey\` (but not both)."
input RefreshDataExtensionQueryInput {
  "The ObjectID of the Data Extension to refresh."
  objectId: String
  "The Customer (External) Key of the Data Extension to refresh."
  customerKey: String
}

`;
