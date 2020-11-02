import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apollo/client';
import theme from '../theme';
import 'swagger-ui-react/swagger-ui.css';

const App = ({ Component, pageProps }) => {
	const apolloClient = useApollo(pageProps.initialApolloState);

	return (
		<>
			<Head>
				<script
					src="https://recorder.meeshkan.com/record.js?client_id=meeshkan_bank"
					defer
				/>
			</Head>
			<ApolloProvider client={apolloClient}>
				<ThemeProvider theme={theme}>
					<CSSReset />
					<Component {...pageProps} />
				</ThemeProvider>
			</ApolloProvider>
		</>
	);
};

App.propTypes = {
	Component: PropTypes.func.isRequired,
	pageProps: PropTypes.object,
};

export default App;
