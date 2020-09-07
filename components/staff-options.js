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
import Action from './action-card';

const StaffOptions = () => {
    return (
        <Container stickyFooter={false} authRole="staff">
            <Stack
                spacing={8}
                p="10"
            >
                <Heading as="h1" fontSize="3xl" textAlign="center">Welcome Staff Member!</Heading>
                <Stack spacing={8} m="0 auto">
                    <Action title="List all clients">
                        <ClientList />
                    </Action>
                    <Action title="Open new client account">
                        <CreateClient />
                    </Action>
                    <Action title="Delete an existing client account">
                        <RemoveClient />
                    </Action>
                </Stack>
            </Stack>
        </Container>
    );
};

export default StaffOptions;
