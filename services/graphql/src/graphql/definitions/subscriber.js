const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  subscriber(input: SubscriberQueryInput = {}): Subscriber
  subscribers(input: SubscribersQueryInput = {}): SubscriberConnection!
}

type Subscriber implements ClientIdentifiable @applyInterfaceFields {
  id: Int! @prop(name: "ID")
  emailAddress: String! @prop(name: "EmailAddress")
  subscriberKey: String! @prop(name: "SubscriberKey")
  attributes: JSON
  emailTypePreference: String @prop(name: "EmailTypePreference")

  createdDate: Date @prop(name: "CreatedDate")
}

type SubscriberConnection @usePropsFrom(type: "Subscriber") {
  edges: [SubscriberEdge]!
  pageInfo: PageInfo!
}

type SubscriberEdge {
  node: Subscriber!
}

input SubscriberQueryInput {
  id: Int!
}

input SubscribersQueryInput {
  "Subscriber IDs to return. Will do an IN query."
  ids: [Int] = []
  "A previous request ID to finish processing. All other input will be ignored."
  continueRequest: String
}

`;