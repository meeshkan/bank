import React, { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import ClientOptions from '../components/client-options';
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
`;

const Clients = () => {
    const { data, loading, error } = useQuery(ClientQuery);
    const client = data?.me;
    const router = useRouter();

    useEffect(() => {
        if (!(client || loading) || error) {
            router.push('/login');
        }
    }, [client, loading]);

    if (client) {
        return <ClientOptions {...client} />;
    }

    return (
        <LoadingPage />
    );
};

export default Clients;
