const { gql } = require('apollo-server-express');

module.exports = gql`

extend type Query {
  linkSend(input: LinkSendQueryInput = {}): LinkSend
  linksForSend(input: LinksForSendQueryInput = {}): [LinkSend]
}

type LinkSend implements ClientIdentifiable @applyInterfaceFields {
  id: Int! @prop(name: "ID")
  url: String @prop(name: "Link.URL")
  alias: String @prop(name: "Link.Alias")
  totalClicks: Int @prop(name: "Link.TotalClicks")
  uniqueClicks: Int @prop(name: "Link.UniqueClicks")
  linkId: Int @prop(name: "Link.ID")
  sendId: Int @prop(name: "SendID")
  clickEvents: [ClickEvent] @prop(name: "SendID")
}

input LinkSendQueryInput {
  id: Int!
}

input LinksForSendQueryInput {
  sendId: Int!
}

`;
