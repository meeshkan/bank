const {
    AuthenticationError,
    ForbiddenError,
    UserInputError,
} = require('apollo-server');
const {
    rootPassword,
    unauthenticated,
    root,
    emailRegex,
    MIN_PASSWORD_LENGTH,
} = require('../../../config/constants');
const data = require('../../../data');
let role = data.role;
const clients = data.clients;

const resolvers = {
    Query: {
        clients: () => {
            if (role !== root) {
                throw new AuthenticationError("Can only fetch users as root");
            }

            return clients;
        },
        me: () => {
            if (role === root || role === unauthenticated) {
                throw new AuthenticationError("Unauthenticated as client");
            }

            return role;
        },
    },
    Mutation: {
        addClient: (parent, args, context) => {
            if (role !== root) {
                throw new AuthenticationError(
                    "Must be authenticated as root to add a client"
                );
            }

            if (clients.map(client => client.name).includes(args.name)) {
                throw new UserInputError(
                    `${args.name} is already a part of our clientele`
                );
            }

            if (!emailRegex.test(args.email)) {
                throw new UserInputError(
                    "Please enter a valid email address"
                );
            }

            if (clients.map(client => client.email).includes(args.email)) {
                throw new UserInputError(
                    `The email address ${args.email} is associated with an existing client`
                )
            }

            if (!(args.password.length >= MIN_PASSWORD_LENGTH)) {
                throw new UserInputError(
                    `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`
                );
            }

            const newClient = {
                id: UUID(),
                name: args.name,
                email: args.email,
                password: args.password,
                balanceInEuroCents: args.balance,
            };

            clients.push(newClient);
            return newClient;
        },
        removeClient: (parent, args, context) => {
            if (role !== root) {
                throw new AuthenticationError(
                    "Must be authenticated as root to remove a client"
                );
            }

            const index = clients.findIndex(client => client.id === args.id);
            if (index === -1) {
                return false;
            }

            clients.splice(index, 1);
            return true;
        },
        authenticateAsRoot: (parent, args, context) => {
            if (args.password === rootPassword) {
                role = root;
                return true;
            }

            throw new AuthenticationError("Incorrect password");
        },
        authenticateAsClient: (parent, args, context) => {
            const client = clients.filter(
                (client) =>
                client.email == args.email && client.password == args.password
            );

            if (client.length > 1) {
                throw new ForbiddenError(
                    "The Meeshkan bank is in an inconsistent state. Sorry!"
                );
            }

            if (client.length === 0) {
                throw new AuthenticationError("Email or password incorrect");
            }

            role = client[0];
            return client[0];
        },
        sendMoney: (parent, args, context) => {
            if (role === root || role === unauthenticated) {
                throw new AuthenticationError("Unauthenticated as client");
            }

            const client = clients.filter((client) => client.id == args.who);
            if (client.length > 1) {
                throw new ForbiddenError(
                    "The Meeshkan bank is in an inconsistent state. Sorry!"
                );
            }

            if (client.length === 0) {
                throw new AuthenticationError("Could not find a client with id " + id);
            }

            if (role.balanceInEuroCents < args.amount) {
                throw new ForbiddenError(
                    "You have insufficient funds to complete this transaction."
                );
            }

            role.balanceInEuroCents -= args.amount;
            client[0].balanceInEuroCents += args.amount;
            return role;
        },
        signOut: () => {
            role = unauthenticated;
            return true;
        },
    },
};

module.exports = resolvers;
