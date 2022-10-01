const customerResolver = require("./customerResolvers/customerResolvers");

const rootResolver = [
  customerResolver,
];

module.exports = rootResolver;
