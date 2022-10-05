const { gql } = require("apollo-server");

const productType = gql`
  type Product {
    id: ID!
    productName: String!
    productPrice: Float!
    productCategory: Category!
    customerID:String!
  }

  input ProductInput {
    id: ID
    productName: String!
    productPrice: Float!
    productCategory: Category!
    customerID:String!
  }
  input ProductUpdateInput {
    id: ID
    productName: String!
    productPrice: Float!
    productCategory: Category!
  }


  extend type Query {
    getProducts: [Product!]!
    getProduct(id: ID!): Product!
    getProductByCustomer(customerID: ID! ):[Product!]
  }
  extend type Mutation {
    addProduct(input: ProductInput!): ResponseAll!
    updateProduct(id: ID!, input: ProductUpdateInput!): ResponseAll!
    deleteProduct(id: ID!): ResponseAll!
  }
  enum Category {
    Device
    Software
    SLA_Package
  }
`;

module.exports = productType;
