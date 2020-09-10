import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from '@chakra-ui/core';
import styled from '@emotion/styled';

const FixedFooter = styled(Flex)`
    left: 0;
    bottom: 0;
    text-align: center;
    width: 100%;
    backdrop-filter: saturate(180%) blur(20px);
    transition: background-color 0.1 ease-in-out;
`;

const Footer = ({ sticky = true }) => (
    <FixedFooter align="center" position={sticky && 'fixed'} py={5} direction="column">
        &copy; 2020, Great and Mighty <b>Meeshkan Bank</b>
    </FixedFooter>
);

Footer.propTypes = {
    sticky: PropTypes.bool,
};

export default Footer;
