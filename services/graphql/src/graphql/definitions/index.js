const { gql } = require('apollo-server-express');
const apiProperty = require('./api-property');
const clickEvent = require('./click-event');
const dataExtension = require('./data-extension');
const dataFolder = require('./data-folder');
const email = require('./email');
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

enum EmailValidators {
  SyntaxValidator
  MXValidator
  ListDetectiveValidator
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
  validators: [EmailValidators!] = [SyntaxValidator]
}

${apiProperty}
${clickEvent}
${dataExtension}
${dataFolder}
${email}
${linkSend}
${send}
${subscriber}

`;
