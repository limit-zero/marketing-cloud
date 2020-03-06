const gql = require('graphql-tag');

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

input DataExtensionQueryInput {
  objectId: String!
}

input DataExtensionsQueryInput {
  "A previous request ID to finish processing. All other input will be ignored."
  continueRequest: String
}

input RefreshDataExtensionQueryInput {
  externalKey: String!
}

`;
