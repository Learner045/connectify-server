const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');


const typeDefs = require('./GraphQL/typeDefs.js');
const resolvers = require('./GraphQL/resolvers');
//const { MONGODB } = require('./config.js');


const PORT = process.env.PORT || 5000;

//we just take the req in object and forward to our context

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req})=>({req})
});

mongoose
  .connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology:true })
  .then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  })
  .catch(err => {
    console.error(err)
  });

