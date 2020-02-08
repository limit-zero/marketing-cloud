const gql = require('graphql-tag');
const email = require('./email');
const linkSend = require('./link-send');
const send = require('./send');

module.exports = gql`

scalar Date
scalar JSON

directive @prop(name: String, needs: [String] = []) on FIELD_DEFINITION

type Query {
  ping: String!
}

type Mutation {
  ping: String!
}

${email}
${linkSend}
${send}

`;
