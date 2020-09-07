import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apollo/client';
import theme from '../theme';  

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

export default App;
