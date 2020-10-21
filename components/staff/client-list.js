import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Heading, Stack, Box, Button, Text } from '@chakra-ui/core';
import { numberWithCommas, months } from '../../lib/utils';

const ListClientsQuery = gql`
	query ListClientsQuery {
		clients {
			id
			name
			email
			balanceInEuroCents
			createdAt
		}
	}
`;

const ClientList = () => {
	const { data, loading, error, refetch } = useQuery(ListClientsQuery);
	let clients = data?.clients;

	if (loading) {
		return <Text>Loading...</Text>;
	}

	if (error) {
		return <Text>{error.message}</Text>;
	}

	return (
		<Stack spacing={8}>
			{clients.map((client) => (
				<Box key={client.name} p={5} shadow="md" borderWidth="1px">
					<Heading fontSize="lg" mb={2}>
						{client.name}
					</Heading>
					<Text fontSize="md">
						email: <em>{client.email}</em>
					</Text>
					<Text fontSize="md">
						id: <em>{client.id}</em>
					</Text>
					<Text fontSize="md">
						current balance:{' '}
						<em>{numberWithCommas(client.balanceInEuroCents / 100)}€</em>
					</Text>
					<Text fontSize="md">
						client since:{' '}
						<em>{`${months[new Date(client.createdAt).getMonth()]}, ${new Date(
							client.createdAt,
						).getFullYear()}`}</em>
					</Text>
				</Box>
			))}
			<Button variantColor="teal" variant="outline" onClick={() => refetch()}>
				Refresh
			</Button>
		</Stack>
	);
};

export default ClientList;
