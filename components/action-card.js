import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Heading, Box, Button, Collapse } from '@chakra-ui/core';

const ActionCard = ({ title, children }) => {
    const [show, setShow] = useState(false);
    const handleToggle = () => setShow(!show);

    return (
        <Box m={5} shadow="md" borderWidth="1px">
            <Button p={5} onClick={handleToggle} width="100%" height="100%">
                <Heading fontSize="xl">{title}</Heading>
            </Button>
            <Collapse isOpen={show} m={10}>
                {children}
            </Collapse>
        </Box>
    );
};

ActionCard.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default ActionCard;
