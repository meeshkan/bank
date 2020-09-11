import React, { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import ClientOptionsPage from '../../components/client/options';
import LoadingPage from '../../components/loading';
import ErrorPage from '../../components/error';

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
        if (!(client || loading)) {
            router.push('/client/login');
        }
    }, [client, loading]);

    if (loading) {
        return <LoadingPage />;
    }

    if (error) {
        return <ErrorPage error={error} />;
    }

    return <ClientOptionsPage {...client} />;
};

export default Clients;
