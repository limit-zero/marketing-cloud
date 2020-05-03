const { gql } = require('apollo-server-express');

module.exports = gql`

extend type Query {
  dataExtension(input: DataExtensionQueryInput!): DataExtension
  dataExtensions(input: DataExtensionsQueryInput = {}): DataExtensionConnection!
  dataExtensionFields(input: DataExtensionFieldsQueryInput!): DataExtensionFieldConnection!
  dataExtensionObjects(input: DataExtensionObjectsQueryInput!): DataExtensionObjectConnection!
}

extend type Mutation {
  refreshDataExtension(input: RefreshDataExtensionQueryInput!): Boolean!
}

enum DataExtensionFieldType {
  Boolean
  Date
  Decimal
  EmailAddress
  Locale
  Number
  Phone
  Text
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

  objects(input: DataExtensionObjectsInput!): DataExtensionObjectConnection @prop(name: "CustomerKey")
  fields(input: DataExtensionFieldsInput = {}): DataExtensionFieldConnection! @prop(name: "CustomerKey")
}

type DataExtensionConnection @usePropsFrom(type: "DataExtension") {
  edges: [DataExtensionEdge]!
  pageInfo: PageInfo!
}

type DataExtensionEdge {
  node: DataExtension!
}

type DataExtensionField {
  id: String! @prop(name: "ObjectID")
  type: DataExtensionFieldType! @prop(name: "FieldType")
  name: String! @prop(name: "Name")
  defaultValue: String @prop(name: "DefaultValue")


  isPrimaryKey: Boolean @prop(name: "IsPrimaryKey")
  isRequired: Boolean @prop(name: "IsRequired")
}

type DataExtensionObject {
  properties: [APIProperty]
}

type DataExtensionObjectConnection {
  edges: [DataExtensionObjectEdge]!
  pageInfo: PageInfo!
}

type DataExtensionObjectEdge {
  node: DataExtensionObject!
}

type DataExtensionFieldConnection @usePropsFrom(type: "DataExtensionField") {
  edges: [DataExtensionFieldEdge]!
  pageInfo: PageInfo!
}

type DataExtensionFieldEdge {
  node: DataExtensionField!
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

input DataExtensionFieldsInput {
  "A previous request ID to finish processing. All other input will be ignored."
  continueRequest: String
}

input DataExtensionFieldsQueryInput {
  "The Customer (External) Key of the Data Extension to load fields for."
  customerKey: String
  "A previous request ID to finish processing. All other input will be ignored."
  continueRequest: String
}

input DataExtensionObjectsInput {
  "The object/row properties to retrieve. For example, if the DE has an \`email\` and \`name\` field you'd like to return, set this to \`['email', 'name']\`"
  props: [String!]!
  "A previous request ID to finish processing. All other input will be ignored."
  continueRequest: String
}

input DataExtensionObjectsQueryInput {
  "The Customer (External) Key of the Data Extension to load objects for."
  customerKey: String
  "The object/row properties to retrieve. For example, if the DE has an \`email\` and \`name\` field you'd like to return, set this to \`['email', 'name']\`"
  props: [String!]!
  "A previous request ID to finish processing. All other input will be ignored."
  continueRequest: String
}

`;
