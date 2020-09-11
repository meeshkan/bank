import React from 'react';
import PropTypes from 'prop-types';
import { Stack, Heading, Text } from '@chakra-ui/core';
import Container from './container';

const Error = ({ error }) => {
    return (
        <Container>
            <Stack m="0 auto">
                <Heading as="h1">An Error has Occured</Heading>
                <Text>{error.message}</Text>
            </Stack>
        </Container>
    );
};

Error.propTypes = {
    error: PropTypes.shape({
        message: PropTypes.string.isRequired,
    }).isRequired,
};

export default Error;
