import React, { useState } from 'react';
import Router from 'next/router';
import { gql, useMutation, useApolloClient } from '@apollo/client';
import { useForm } from 'react-hook-form';
import {
    InputGroup,
    InputRightElement,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Heading,
    Stack,
    Button,
} from '@chakra-ui/core';
import { getErrorMessage } from '../../lib/auth/form';
import Container from '../container';

const AuthenticateAsClientMutation = gql`
    mutation AuthenticateAsClientMutation($email: String!, $password: String!) {
        authenticateAsClient(email: $email, password: $password) {
            id
            name
            email
        }
    }
`;

const ClientLogin = () => {
    const client = useApolloClient();
    const [authenticateAsClient] = useMutation(AuthenticateAsClientMutation);
    const { handleSubmit, errors, setError, register, formState } = useForm();

    const onSubmit = async ({ email, password }) => {
        try {
            await client.resetStore();
            const { data } = await authenticateAsClient({
                variables: {
                    email,
                    password,
                },
            });

            if (data.authenticateAsClient) {
                Router.push('/clients');
            }
        } catch (error) {
            setError('password', { message: getErrorMessage(error) });
        }
    };

    const [showPassword, setShowPassword] = useState(false);
    const handleClick = () => setShowPassword(!showPassword);

    return (
        <Container>
            <Stack
                spacing={8}
                m="0 auto"
                mt="10"
                maxWidth="900px"
            >
                <Heading as="h1">Client Login</Heading>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl isInvalid={errors.password} isRequired>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input
                            name="email"
                            type="email"
                            placeholder="Enter client's email address"
                            ref={register}
                            mb={4}
                        />
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <InputGroup size="md">
                            <Input
                                name="password"
                                pr="4.5rem"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter password"
                                ref={register}
                                isRequired
                            />
                            <InputRightElement width="4.5rem">
                                <Button h="1.75rem" size="sm" onClick={handleClick}>
                                    {showPassword ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                            {errors.password && errors.password.message}
                        </FormErrorMessage>
                    </FormControl>
                    <Button
                        mt={4}
                        variantColor="teal"
                        isLoading={formState.isSubmitting}
                        type="submit"
                    >
                        Login
                    </Button>
                </form>
            </Stack>
        </Container>
    );
};

export default ClientLogin;
