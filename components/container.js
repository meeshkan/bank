import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from '@chakra-ui/core';
import Nav from './nav';
import Footer from './footer';

const Container = ({ children, stickyFooter, authRole }) => {
    const authenticated = authRole && { as: authRole };

    return (
        <>
            <Nav authenticated={authenticated} />
            <Flex
                as="main"
                justifyContent="center"
                flexDirection="column"
                bg="white"
                color="black"
                px={8}
            >
                {children}
                <Footer sticky={stickyFooter} />
            </Flex>
        </>
    );
};

Container.propTypes = {
    children: PropTypes.node.isRequired,
    stickyFooter: PropTypes.bool,
    authRole: PropTypes.string,
};

export default Container;
