const { gql } = require("apollo-server");
const root = require("./rootType");
const customerType = require("./customerTypes/customerTypes");
const productType = require("./productTypes/productTypes");

const schemaArray = [root, customerType,productType];

module.exports = schemaArray;
