// https://github.com/vercel/next.js/blob/master/examples/api-routes-apollo-server-and-client/apollo/client.js

import { useMemo } from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';

let apolloClient;

const createIsomorphLink = () => {
	if (typeof window === 'undefined') {
		const { SchemaLink } = require('@apollo/client/link/schema');
		const { schema } = require('./schema');
		return new SchemaLink({ schema });
	} else {
		const { HttpLink } = require('@apollo/client/link/http');
		return new HttpLink({
			uri: '/api/graphql',
			credentials: 'same-origin',
		});
	}
};

const createApolloClient = () => {
	return new ApolloClient({
		ssrMode: typeof window === 'undefined',
		link: createIsomorphLink(),
		cache: new InMemoryCache(),
	});
};

export const initializeApollo = (initialState = null) => {
	const _apolloClient = apolloClient ? apolloClient : createApolloClient();

	if (initialState) {
		_apolloClient.cache.restore(initialState);
	}

	if (typeof window === 'undefined') {
		return _apolloClient;
	}

	if (!apolloClient) {
		apolloClient = _apolloClient;
	}

	return _apolloClient;
};

export const useApollo = (initialState) => {
	const store = useMemo(() => initializeApollo(initialState), [initialState]);
	return store;
};
