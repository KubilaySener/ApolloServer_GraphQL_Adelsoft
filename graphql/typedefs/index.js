const { gql } = require("apollo-server");
const root = require("./rootType");
const customerType = require("./customerTypes/customerTypes");

const schemaArray = [root, customerType];

module.exports = schemaArray;
