import React from 'react';
import { gql, useMutation, useApolloClient } from '@apollo/client';
import { useForm } from 'react-hook-form';
import {
	useToast,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Input,
	Button,
} from '@chakra-ui/core';
import { getErrorMessage } from '../../lib/auth/form';

const RemoveClientMutation = gql`
	mutation RemoveClientMutation($id: ID!) {
		removeClient(id: $id)
	}
`;

const RemoveClient = () => {
	const client = useApolloClient();
	const [removeClient] = useMutation(RemoveClientMutation);
	const { handleSubmit, errors, setError, register, formState } = useForm();
	const toast = useToast();

	const onSubmit = async ({ id }) => {
		try {
			await client.resetStore();
			const { data } = await removeClient({
				variables: {
					id,
				},
			});

			if (!data.removeClient) {
				return toast({
					title: 'Client removal failed.',
					description: `Client with ID "${id}" could not be removed.`,
					status: 'error',
					duration: 5000,
					isClosable: true,
				});
			}

			toast({
				title: 'Client removed.',
				description: `Client with ID "${id}" has been removed.`,
				status: 'success',
				duration: 5000,
				isClosable: true,
			});
		} catch (error) {
			setError('id', { message: getErrorMessage(error) });
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormControl isInvalid={errors.id} isRequired>
				<FormLabel htmlFor="id">Client ID</FormLabel>
				<Input
					name="id"
					type="text"
					placeholder="Enter the client's ID"
					ref={register}
					mb={4}
				/>
				<FormErrorMessage>{errors.id && errors.id.message}</FormErrorMessage>
			</FormControl>
			<Button
				mt={4}
				variantColor="teal"
				isLoading={formState.isSubmitting}
				type="submit"
			>
				Remove Client
			</Button>
		</form>
	);
};

export default RemoveClient;
