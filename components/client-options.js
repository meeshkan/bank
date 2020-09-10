import React from 'react';
import PropTypes from 'prop-types';
import {
    Heading,
    Stack,
    Text,
} from '@chakra-ui/core';
import Container from './container';
import SendMoney from './send-money';
import Action from './action-card';
import { numberWithCommas } from '../lib/utils';

const ClientOptions = ({ id, name, balanceInEuroCents }) => {
    return (
        <Container stickyFooter={false} authRole="client">
            <Stack
                spacing={8}
                p="10"
                textAlign="center"
            >
                <Heading as="h1" fontSize="3xl">Welcome {name}!</Heading>
                <Stack spacing={8} m="0 auto">
                    <Action title="View your current balance">
                        <Text fontSize="lg">
                            Current balance:{' '}
                            <b>{numberWithCommas(balanceInEuroCents / 100)}€</b>
                        </Text>
                    </Action>
                    <Action title="View your ID">
                        <Text fontSize="lg">
                            ID: <b>{id}</b>
                        </Text>
                    </Action>
                    <Action title="Send money">
                        <SendMoney />
                    </Action>
                </Stack>
            </Stack>
        </Container>
    );
};

ClientOptions.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    balanceInEuroCents: PropTypes.number.isRequired,
};

export default ClientOptions;
