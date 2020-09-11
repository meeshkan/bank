import React from 'react';
import PropTypes from 'prop-types';
import { Stack, Text } from '@chakra-ui/core';
import Container from './container';

const Error = ({ error }) => {
    return (
        <Container>
            <Stack m="0 auto">
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
