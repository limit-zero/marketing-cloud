const { gql } = require('apollo-server-express');

module.exports = gql`

type APIProperty {
  name: String! @prop(name: "Name")
  value: String @prop(name: "Value")
}

`;
