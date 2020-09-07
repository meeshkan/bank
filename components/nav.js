import React from 'react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { Button, Flex, Box, Heading, Icon, Text, Stack } from '@chakra-ui/core';
import styled from '@emotion/styled';
import LogoutButton from './logout-button';

const CustomFlex = styled(Flex)`
    position: sticky;
    z-index: 10;
    top: 0;
    backdrop-filter: saturate(200%) blur(40px);
    transition: background-color 0.1 ease-in-out;
`;

const Nav = ({ authenticated }) => {
    return (
        <CustomFlex
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            maxWidth="100%"
            width="100%"
            bg="rgba(255, 255, 255, 0.5)"
            as="nav"
            pt={5}
            px={10}
            pb={5}
            mx="auto"
        >
            <Box>
                <NextLink href="/" passHref>
                    <Button as="a" variant="ghost" m={2} p={[1, 4]}>
                        <Heading as="h1" size="md">
                            <Stack isInline>
                                <Icon name="Logo" w="auto" />{' '}
                                <Text>🏦</Text>
                            </Stack>
                        </Heading>
                    </Button>
                </NextLink>
            </Box>
            <Box>
                {authenticated ? (
                    <>
                        <LogoutButton />
                        <NextLink href={authenticated.as === 'staff' ? '/staff' : '/home'} passHref>
                            <Button as="a" variant="solid" variantColor="teal" m={2} p={[1, 4]}>
                                Dashboard
                            </Button>
                        </NextLink>
                    </>
                ) : (
                    <>
                        <NextLink href="/staff" passHref>
                            <Button as="a" variant="ghost" m={2} p={[1, 4]}>
                                Staff
                            </Button>
                        </NextLink>
                        <NextLink href="/login" passHref>
                            <Button as="a" variant="solid" variantColor="teal" m={2} p={[1, 4]}>
                                Clients
                            </Button>
                        </NextLink>
                    </>
                )}
            </Box>
        </CustomFlex>
    );
};

Nav.propTypes = {
    authenticated: PropTypes.shape({
        as: PropTypes.string,
    }),
};

export default Nav;
