import { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Stack, Spinner, Text } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import ClientLogin from '../components/client-login';
import ClientOptions from '../components/client-options';
import Container from '../components/container';
import LoadingPage from '../components/loading-page';

const ClientQuery = gql`
    query RootQuery {
        me {
            id
            name
            email
            balanceInEuroCents
        }
    }
`

const Clients = () => {
    const { data, loading, error } = useQuery(ClientQuery);
    const client = data?.me;
    const router = useRouter();

    useEffect(() => {
        if (!(client || loading)) {
            router.push('/login')
        }
    }, [client, loading])

    if (client) {
        return <ClientOptions {...client} />;
    }

    return (
        <LoadingPage />
    );
};

export default Clients;
