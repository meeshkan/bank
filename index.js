const express = require('express');
const swaggerUI = require('swagger-ui-express');
const { InternalServerError } = require('./utils/errors');
const apiRouter = require('./routes');
const openapi = require('./openapi');

const app = express();

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
    `Server ready at http://localhost:${PORT} with docs at http://localhost:${PORT}/docs and OpenAPI spec at http://localhost:${PORT}/api/openapi. Have fun!`
  )
);
