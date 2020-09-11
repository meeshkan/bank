import React, { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import StaffOptionsPage from '../../components/staff/options';
import LoadingPage from '../../components/loading';
import ErrorPage from '../../components/error';

const RootQuery = gql`
    query RootQuery {
        root
    }
`;

const Staff = () => {
    const { data, loading, error } = useQuery(RootQuery);
    const isRoot = data?.root;
    const router = useRouter();

    useEffect(() => {
        if (!(isRoot || loading)) {
            router.push('/staff/login');
        }
    }, [isRoot, loading]);

    if (loading) {
        return <LoadingPage />;
    }

    if (error) {
        return <ErrorPage error={error} />;
    }

    return <StaffOptionsPage />;
};

export default Staff;
