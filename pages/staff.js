import { gql, useQuery } from '@apollo/client';
import { Stack, Spinner } from '@chakra-ui/core';
import StaffLogin from '../components/staff-login';
import StaffOptions from '../components/staff-options';
import Container from '../components/container';
import LoadingPage from '../components/loading-page';

const RootQuery = gql`
    query RootQuery {
        root
    }
`

const Staff = () => {
    const { data, loading, error } = useQuery(RootQuery);
    const isRoot = data?.root;

    if (loading) {
        return <LoadingPage />;
    }

    if (error) {
        return (
            <Container>
                <Stack m="0 auto">
                    <p>{error.message}</p>
                </Stack>
            </Container>
        );
    }

    if (!isRoot) {
        return <StaffLogin />;
    }

    return <StaffOptions />;
};

export default Staff;
