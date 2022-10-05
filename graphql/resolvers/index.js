const customerResolver = require("./customerResolvers/customerResolvers");
const productResolver = require("./productResolvers/productResolvers");

const rootResolver = [
  customerResolver,productResolver
];

module.exports = rootResolver;
