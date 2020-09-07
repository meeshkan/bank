import { Box, Heading, Text, Stack } from '@chakra-ui/core';

const Feature = ({ title, desc, ...rest }) => {
    return (
        <Box p={5} shadow="md" borderWidth="1px" flex="1" rounded="md" {...rest}>
            <Heading fontSize="xl">{title}</Heading>
            <Text mt={4}>{desc}</Text>
        </Box>
    );
};

const Features = () => {
    return (
        <>
            <Stack isInline spacing={8} align="center" mt={5}>
                <Feature
                    title="No Hidden Fees 🙅‍♂️"
                    desc="You can exchange money with your friends, family, and colleagues without worrying about any hidden fees."
                />
                <Feature
                    title="Save Money 💰"
                    desc="You deserve good things. With a whooping 10-15% interest rate per annum, grow your savings."
                />
            </Stack>
            <Stack isInline spacing={8} align="center" mt={5}>
                <Feature
                    title="Invest Your Earnings 📈"
                    desc="We are working on bringing you your entire investment portfolio here."
                />
                <Feature
                    title="View Your Spendings 📊"
                    desc="You will soon be able to view detailed analytics on your daily spending."
                />
            </Stack>
        </>
    );
};

export default Features;
