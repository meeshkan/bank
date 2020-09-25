import express from 'express';
import bodyParser from 'body-parser';
const { ApolloServer, gql } = require('apollo-server-express');
import request from 'supertest';
import { bankSchema } from '../lib/apollo/type-defs';
import { resolvers } from '../lib/apollo/resolvers';

const app = express();
const server = new ApolloServer({ typeDefs: gql(bankSchema), resolvers });
server.applyMiddleware({ app });

test('addition works', () => {
	expect(1 + 1).toBe(2);
});

test('gql works', () => {
	return request(app)
		.post('/graphql')
		.send({ query: 'mutation { authenticateAsRoot(password: "pa$$w0rd") }' })
		.set('Accept', 'application/json')
		.expect(200)
		.then((response) => {
			expect(JSON.parse(response.text).data.authenticateAsRoot).toBe(true);
		});
});
