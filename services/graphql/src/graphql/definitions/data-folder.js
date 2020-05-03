const { gql } = require('apollo-server-express');

module.exports = gql`

extend type Query {
  dataFolder(input: DataFolderQueryInput = {}): DataFolder
}

type DataFolder {
  id: Int! @prop(name: "ID")
  name: String! @prop(name: "Name")
  fullName: String! @prop(name: "Name", needs: ["ParentFolder.ID"])
  description: String! @prop(name: "Description")
  contentType: String @prop(name: "ContentType")
  isActive: Boolean @prop(name: "IsActive")
  isEditable: Boolean @prop(name: "IsEditable")
  allowChildren: Boolean @prop(name: "AllowChildren")

  parentFolderId: Int @prop(name: "ParentFolder.ID")
  parent: DataFolder @prop(name: "ParentFolder.ID")

  createdDate: Date @prop(name: "CreatedDate")
  modifiedDate: Date @prop(name: "ModifiedDate")
}

input DataFolderQueryInput {
  id: Int!
}

`;
