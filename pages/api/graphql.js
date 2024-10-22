import { ApolloServer } from 'apollo-server-micro';
import { schema } from '../../lib/apollo/schema';

const server = new ApolloServer({
	schema,
	introspection: true,
	playground: true,
});

export const config = {
	api: {
		bodyParser: false,
	},
};

export default server.createHandler({ path: '/api/graphql' });
