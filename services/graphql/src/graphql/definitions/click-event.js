const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  clickEventsForSend(input: ClickEventsForSendQueryInput = {}): ClickEventConnection!
}

type ClickEvent implements ClientIdentifiable @applyInterfaceFields {
  id: Int! @prop(name: "ID")
  eventType: String @prop(name: "EventType")
  sendId: Int @prop(name: "SendID")
  subscriberKey: String @prop(name: "SubscriberKey")
  url: String @prop(name: "URL")
  urlId: Int @prop(name: "URLID")
  batchId: Int @prop(name: "BatchID")

  eventDate: Date @prop(name: "EventDate")
  createdDate: Date @prop(name: "CreatedDate")
}

type ClickEventConnection @usePropsFrom(type: "ClickEvent") {
  edges: [ClickEventEdge]!
  pageInfo: PageInfo!
}

type ClickEventEdge {
  node: ClickEvent!
}

input ClickEventsForSendQueryInput {
  "The Send ID to retrieve click events for."
  sendId: Int!
  "A previous request ID to finish processing. All other input will be ignored."
  continueRequest: String
}

`;
