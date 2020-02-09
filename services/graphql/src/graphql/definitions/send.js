const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  send(input: SendQueryInput = {}): Send
  sends(input: SendsQueryInput = {}): SendConnection!
}

type Send implements ClientIdentifiable @applyInterfaceFields {
  id: Int! @prop(name: "ID")
  emailName: String! @prop(name: "EmailName")
  subject: String @prop(name: "Subject")
  previewUrl: String @prop(name: "PreviewURL")
  status: String @prop(name: "Status")
  sentDate: Date @prop(name: "SentDate")

  numberSent: Int @prop(name: "NumberSent")
  numberDelivered: Int @prop(name: "NumberDelivered")
  numberExcluded: Int @prop(name: "NumberExcluded")
  numberTargeted: Int @prop(name: "NumberTargeted")
  uniqueOpens: Int @prop(name: "UniqueOpens")
  uniqueClicks: Int @prop(name: "UniqueClicks")
  unsubscribes: Int @prop(name: "Unsubscribes")

  email: Email @prop(name: "Email.ID")
  links: [LinkSend]

  createdDate: Date @prop(name: "CreatedDate")
  modifiedDate: Date @prop(name: "ModifiedDate")
}

type SendConnection @usePropsFrom(type: "Send") {
  edges: [SendEdge]!
  pageInfo: PageInfo!
}

type SendEdge {
  node: Send!
}

input SendQueryInput {
  id: Int!
}

input SendsQueryInput {
  "A previous request ID to finish processing. All other input will be ignored."
  continueRequest: String
}

`;
