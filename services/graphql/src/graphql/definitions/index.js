const { gql } = require('apollo-server-express');
const apiProperty = require('./api-property');
const clickEvent = require('./click-event');
const dataExtension = require('./data-extension');
const dataFolder = require('./data-folder');
const email = require('./email');
const filterPart = require('./filter-part');
const linkSend = require('./link-send');
const send = require('./send');
const subscriber = require('./subscriber');

module.exports = gql`

scalar Date
scalar JSON

directive @applyInterfaceFields on OBJECT
directive @prop(name: String, needs: [String] = []) on FIELD_DEFINITION
directive @usePropsFrom(type: String!) on OBJECT

type Query {
  ping: String!
  validateEmailAddress(input: ValidateEmailAddressQueryInput!): Boolean!
}

enum EmailValidator {
  SyntaxValidator
  MXValidator
  ListDetectiveValidator
}

enum SimpleOperator {
  equals
  notEquals
  greaterThan
  lessThan
  isNotNull
  isNull
  greaterThanOrEqual
  lessThanOrEqual
  between
  IN
  like
}

enum LogicalOperator {
  AND
  OR
}

type Mutation {
  ping: String!
}

type PageInfo {
  requestId: String!
  hasMoreData: Boolean!
}

interface ClientIdentifiable {
  clientId: Int! @prop(name: "Client.ID")
}

input ValidateEmailAddressQueryInput {
  email: String!
  validators: [EmailValidator!] = [SyntaxValidator]
}

${apiProperty}
${clickEvent}
${dataExtension}
${dataFolder}
${email}
${filterPart}
${linkSend}
${send}
${subscriber}

`;
