import { useState } from 'react';
import {
    Heading,
    Box,
    Stack,
    Button,
    Text,
    Collapse,
} from "@chakra-ui/core";
import Container from './container';
import ClientList from './client-list';
import CreateClient from './create-client';
import RemoveClient from './remove-client';
import SendMoney from './send-money';
import Action from './action-card';

const numberWithCommas = number => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const ClientOptions = ({ id, name, email, balanceInEuroCents }) => {
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
                    <Action title="Send money">
                        <SendMoney />
                    </Action>
                </Stack>
            </Stack>
        </Container>
    );
};

export default ClientOptions;
