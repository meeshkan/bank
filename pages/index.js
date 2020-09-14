import React from 'react';
import { Heading, Text, Stack } from '@chakra-ui/core';
import Container from '../components/container';
import Features from '../components/features';

const Home = () => {
	return (
		<Container>
			<Stack
				as="main"
				spacing={6}
				textAlign="center"
				m="0 auto"
				mt="20"
				maxWidth="700px"
			>
				<Heading
					as="h1"
					color="gray.900"
					fontSize="3xl"
					fontWeight={900}
					mb={4}
					letterSpacing="wide"
					lineHeight="short"
				>
					Welcome to the Meeshkan Bank!
				</Heading>
				<Text fontSize="md">
					We offer you the best banking solutions (to make you rich).
				</Text>
				<Features />
			</Stack>
		</Container>
	);
};

export default Home;
