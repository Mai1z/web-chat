const { ApolloServer, gql } = require('apollo-server');

const { sequelize } = require('./models/index')

// The GraphQL schema
const typeDefs = require('./graphql/typeDefs.js');

// A map of functions which return data for the schema.
const resolvers = require('./graphql/resolvers.js');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: (ctx) => ctx,
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);

    sequelize
        .authenticate()
        .then(() => console.log("SUCCESS"))
        .catch(err => console.log(err))
});