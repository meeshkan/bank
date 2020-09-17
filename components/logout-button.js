import React, { useState } from 'react';
import { gql, useMutation, useApolloClient } from '@apollo/client';
import { Button } from '@chakra-ui/core';
import Router from 'next/router';

const SignOutMutation = gql`
	mutation SignOutMutation {
		signOut
	}
`;

const LogoutButton = () => {
	const client = useApolloClient();
	const [signOut] = useMutation(SignOutMutation);

	const [isLoading, setIsLoading] = useState(false);

	const handleClick = async () => {
		setIsLoading(true);

		try {
			await client.resetStore();
			const { data } = await signOut();

			if (data.signOut) {
				Router.push('/');
			}
		} catch (error) {
			setIsLoading(false);
			console.log(error);
		}
	};

	return (
		<Button
			onClick={handleClick}
			isLoading={isLoading}
			as="a"
			variant="solid"
			variantColor="teal"
			cursor="pointer"
			m={2}
			p={[2, 4]}
		>
			Logout
		</Button>
	);
};

export default LogoutButton;
