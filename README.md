# The Meeshkan Bank

Welcome to the Meeshkan Bank!

At the Meeshkan Bank, we send each other Meeshkan Money and watch eagerly as it accumulates interest.

The Meeshkan Bank is proudly tested by [Meeshkan](https://meeshkan.com), and if you sign up for Meeshkan, it will be the example project you see on the platform.

## Getting started

To start the Meeshkan bank, you can run the following command:

```bash
npm install && npm start
```

To run the Meeshkan bank in dev mode, you can run

```bash
npm install && npm run dev
```

### How to use

The Meeshkan Bank's graphql endpoint is accessible at `http://localhost:4000/graphql`. Point your browser there after starting up the Meeshkan bank and you'll see a nice UI where you can interact with the bank.

When you start the Meeshkan bank, it is in an unauthenticated state. You can authenticate as root using the `authenticateAsRoot` graphql endpoint with the password `pa$$w0rd` (did we mention that we take security seriously at the Meeshkan Bank?).

From the root state, you can add clients and delete clients. You can also authenticate as a client, which allows you to send money to and fro.

### OpenAPI

In addition to its primary graphql interface, the Meeshkan bank does have some extra endpoints. To learn what these are, you can point your browser at http://localhost:4000/openapi.

### Gotchyas

The Meeshkan Bank has no persistence layer (what a bank!), so every time you restart it, the balances reset. If only real banks worked that way...
