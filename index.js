const { ApolloServer } = require("apollo-server");
const db = require("./db");
const typeDefs = require("./graphql/typedefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`YOUR API IS RUNNING AT: ${url} :)`);
});

