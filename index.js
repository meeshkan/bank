const express = require('express');
const apiRouter = require('./routes');

const app = express();

app.use(express.json());
app.use('/api', apiRouter);
app.use((error, req, res, next) => {
  if (error.status) {
    return res.status(error.status).json(error);
  }

  throw new InternalServerError(error.message);
});

const PORT = 8080;

app.listen({ port: PORT }, () =>
  console.log(
    `Server ready at http://localhost:${PORT} with openapi spec visible at http://localhost:${PORT}/bank/openapi. Have fun!`
  )
);
