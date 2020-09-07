import React, { useState } from 'react';
import { gql, useMutation, useApolloClient } from '@apollo/client';
import { useForm } from 'react-hook-form';
import {
    useToast,
    InputGroup,
    InputRightElement,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Button,
} from '@chakra-ui/core';
import { getErrorMessage } from '../lib/auth/form';

const AddClientMutation = gql`
    mutation AddClientMutation($email: String!, $name: String!, $password: String!, $balanceInEuroCents: Int!) {
        addClient(email: $email, name: $name, password: $password, balanceInEuroCents: $balanceInEuroCents) {
            email
            name
        }
    }
`;

const CreateClient = () => {
    const client = useApolloClient();
    const [addClient] = useMutation(AddClientMutation);
    const { handleSubmit, errors, setError, register, formState } = useForm();
    const toast = useToast();

    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async ({ email, name, password, balanceInEuroCents }) => {
        try {
            await client.resetStore();
            const { data } = await addClient({
                variables: {
                    email,
                    name,
                    password,
                    balanceInEuroCents: parseInt(balanceInEuroCents),
                },
            });

            if (data.addClient) {
                const { name: clientName } = data.addClient;
                toast({
                    title: 'Client registered.',
                    description: `We've created an account for ${clientName}.`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
            }
        } catch (error) {
            setError('password', { message: getErrorMessage(error) });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.password} isRequired>
                <FormLabel htmlFor="name">Full Name</FormLabel>
                <Input
                    name="name"
                    type="text"
                    placeholder="Enter client's full name"
                    ref={register}
                    mb={4}
                />
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                    name="email"
                    type="email"
                    placeholder="Enter client's email address"
                    ref={register}
                    mb={4}
                />
                <FormLabel htmlFor="password">Password</FormLabel>
                <InputGroup size="md" mb={4}>
                    <Input
                        name="password"
                        pr="4.5rem"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter client's password"
                        ref={register}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <FormLabel htmlFor="balanceInEuroCents">Opening Balance (in cents)</FormLabel>
                <Input
                    name="balanceInEuroCents"
                    type="number"
                    min="1"
                    placeholder="Enter client's opening balance"
                    ref={register}
                    mb={4}
                />
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
                Open Account
            </Button>
        </form>
    );
};

export default CreateClient;
