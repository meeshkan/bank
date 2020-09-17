import React from 'react';
import { Stack, Spinner } from '@chakra-ui/core';
import Container from './container';

const Loading = () => {
	return (
		<Container>
			<Stack m="0 auto" mt="10">
				<Spinner size="xl" />
			</Stack>
		</Container>
	);
};

export default Loading;
