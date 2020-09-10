const express = require('express');
const swaggerUI = require('swagger-ui-express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./api/graphql/type-defs');
const resolvers = require('./api/graphql/resolvers');
const { InternalServerError } = require('./api/rest/utils/errors');
const apiRouter = require('./api/rest/routes');
const openapi = require('./openapi');

const app = express();

const server = new ApolloServer({ typeDefs, resolvers, introspection: true });
server.applyMiddleware({ app, path:'/api/graphql' });

app.use(express.json());
app.use('/api', apiRouter);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(openapi));
app.use((error, req, res, next) => {
  if (error.status) {
    return res.status(error.status).json(error);
  }

  throw new InternalServerError(error.message);
});

const PORT = 8080;

app.listen({ port: PORT }, () =>
  console.log(
    `Server ready at http://localhost:${PORT} with GraphQL playground at http://localhost:${PORT}/api/graphql, REST API docs at http://localhost:${PORT}/docs, and OpenAPI spec at http://localhost:${PORT}/api/openapi. Have fun!`
  )
);
