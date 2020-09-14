import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Collapse } from '@chakra-ui/core';

const ActionCard = ({ title, children }) => {
	const [show, setShow] = useState(false);

	return (
		<>
			<Button
				p={4}
				mt={4}
				onClick={() => setShow(!show)}
				width="100%"
				height="100%"
				fontSize="xl"
				borderBottomRightRadius={show ? 0 : `auto`}
				borderBottomLeftRadius={show ? 0 : `auto`}
			>
				{title}
			</Button>
			<Collapse
				isOpen={show}
				shadow="md"
				borderWidth="1px"
				p={4}
				borderRadius="0 0 4px 4px"
			>
				{children}
			</Collapse>
		</>
	);
};

ActionCard.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

export default ActionCard;
