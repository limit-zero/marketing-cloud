const gql = require('graphql-tag');
const clickEvent = require('./click-event');
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

${clickEvent}
${dataFolder}
${email}
${linkSend}
${send}
${subscriber}

`;
