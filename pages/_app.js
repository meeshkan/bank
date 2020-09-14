import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apollo/client';
import theme from '../theme';
import 'swagger-ui-react/swagger-ui.css';

const App = ({ Component, pageProps }) => {
	const apolloClient = useApollo(pageProps.initialApolloState);

	return (
		<ApolloProvider client={apolloClient}>
			<ThemeProvider theme={theme}>
				<CSSReset />
				<Component {...pageProps} />
			</ThemeProvider>
		</ApolloProvider>
	);
};

App.propTypes = {
	Component: PropTypes.func.isRequired,
	pageProps: PropTypes.object,
};

export default App;
