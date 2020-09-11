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

const AuthenticateAsRootMutation = gql`
    mutation AuthenticateAsRootMutation($password: String!) {
        authenticateAsRoot(password: $password)
    }
`;

const StaffLogin = () => {
    const client = useApolloClient();
    const [authenticateAsRoot] = useMutation(AuthenticateAsRootMutation);
    const { handleSubmit, errors, setError, register, formState } = useForm();

    const onSubmit = async ({ password }) => {
        try {
            await client.resetStore();
            const { data } = await authenticateAsRoot({
                variables: { password },
            });

            if (data.authenticateAsRoot) {
                Router.push('/staff');
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
                <Heading as="h1">Staff Login</Heading>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl isInvalid={errors.password} isRequired>
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

export default StaffLogin;
