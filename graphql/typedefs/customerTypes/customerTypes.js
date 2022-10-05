const { gql } = require("apollo-server");

const customerType = gql`
  type Customer {
    id: ID!
    customerName: String!
    customerAddress: String!
    customerPhone: String!
    customerStatus: String!
    customerSalesPerson: String!
    customerNote: String!
    customerProduct: [Product]
  }
  input CustomerInput {
    id: ID
    customerName: String!
    customerAddress: String!
    customerPhone: String!
    customerStatus: String!
    customerSalesPerson: String!
    customerNote: String!   
  }
  type ResponseAll{
    success: Boolean!
    message: String!
  }

  extend type Query {
    getCustomers: [Customer!]!
    getCustomer(id: ID!): Customer!
  }
  extend type Mutation {
    addCustomer(input: CustomerInput!): ResponseAll!
    updateCustomer(id: ID!, input: CustomerInput!): ResponseAll!
    deleteCustomer(id: ID!): ResponseAll!
  }
`;

module.exports = customerType;
