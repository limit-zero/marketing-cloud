const gql = require('graphql-tag');
const clickEvent = require('./click-event');
const email = require('./email');
const linkSend = require('./link-send');
const send = require('./send');

module.exports = gql`

scalar Date
scalar JSON

directive @applyInterfaceFields on OBJECT
directive @prop(name: String, needs: [String] = []) on FIELD_DEFINITION

type Query {
  ping: String!
}

type Mutation {
  ping: String!
}

interface ClientIdentifiable {
  clientId: Int! @prop(name: "Client.ID")
}

${clickEvent}
${email}
${linkSend}
${send}

`;
