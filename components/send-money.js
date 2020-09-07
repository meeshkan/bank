import { useState } from 'react';
import Router from 'next/router';
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
    Heading,
    Stack,
    Button,
} from "@chakra-ui/core";
import { getErrorMessage } from '../lib/auth/form';

const SendMoneyMutation = gql`
    mutation SendMoneyMutation($who: ID!, $amount: Int!) {
        sendMoney(who: $who, amount: $amount) {
            id
            balanceInEuroCents
        }
    }
`

const SendMoney = () => {
    const client = useApolloClient();
    const [sendMoney] = useMutation(SendMoneyMutation);
    const { handleSubmit, errors, setError, register, formState } = useForm();
    const toast = useToast();

    const onSubmit = async ({ id, amount }) => {
        try {
            await client.resetStore();
            const { data } = await sendMoney({
                variables: {
                    who: id,
                    amount: parseInt(amount),
                },
            });

            if (data.sendMoney) {
                toast({
                    title: "Amount sent.",
                    description: `${amount} cents were sent to client with ID ${id}.`,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            }
        } catch (error) {
            setError('amount', { message: getErrorMessage(error) });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.amount} isRequired>
                <FormLabel htmlFor="id">Recipient's ID</FormLabel>
                <Input
                    name="id"
                    type="text"
                    placeholder="Enter the recipient's ID"
                    ref={register}
                    mb={4}
                />
                <FormLabel htmlFor="amount">Amount (in cents)</FormLabel>
                <Input
                    name="amount"
                    type="number"
                    placeholder="Enter the amount to send"
                    ref={register}
                    mb={4}
                />
                <FormErrorMessage>
                    {errors.amount && errors.amount.message}
                </FormErrorMessage>
            </FormControl>
            <Button
                mt={4}
                variantColor="teal"
                isLoading={formState.isSubmitting}
                type="submit"
            >
                Send
            </Button>
        </form>
    );
};

export default SendMoney;
