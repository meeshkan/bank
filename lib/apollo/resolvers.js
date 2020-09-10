import {
  AuthenticationError,
  ForbiddenError,
  UserInputError,
} from 'apollo-server';
import { v4 as UUID } from 'uuid';

const MIN_PASSWORD_LENGTH = 8;
const emailRegex = /(.+)@(.+){2,}\.(.+){2,}/;

const rootPassword = 'pa$$w0rd';
const unauthenticated = 'unauthenticated';
const root = 'root';

let role = unauthenticated;

const clients = [
  {
    id: '5c9cf5e4-60fa-4069-9728-bb4f660b5364',
    name: 'Mike Solomon',
    email: 'mike@meeshkan.com',
    password: 'not secure',
    balanceInEuroCents: 1492,
  },
  {
    id: 'fd800015-6d09-4469-92a2-61d8fd25723f',
    name: 'Makenna Smutz',
    email: 'makenna@meeshkan.com',
    password: 'also not secure',
    balanceInEuroCents: 1493,
  },
];

export const resolvers = {
    Query: {
        clients: () => {
            if (role !== root) {
                throw new AuthenticationError('Can only fetch users as root');
            }

            return clients;
        },
        me: () => {
            if (role === root || role === unauthenticated) {
                throw new AuthenticationError('Unauthenticated as client');
            }

            return role;
        },
        root: () => {
            if (role !== root) {
                return false;
            }

            return true;
        }
    },
    Mutation: {
        addClient: (parent, args) => {
            if (role !== root) {
                throw new AuthenticationError(
                    'Must be authenticated as root to add a client'
                );
            }

            if (clients.map(client => client.name).includes(args.name)) {
                throw new UserInputError(
                    `${args.name} is already a part of our clientele`
                );
            }

            if (!emailRegex.test(args.email)) {
                throw new UserInputError(
                    'Please enter a valid email address'
                );
            }

            if (clients.map(client => client.email).includes(args.email)) {
                throw new UserInputError(
                    `The email address ${args.email} is associated with an existing client`
                );
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
                balanceInEuroCents: args.balanceInEuroCents,
            };

            clients.push(newClient);
            return newClient;
        },
        removeClient: (parent, args) => {
            if (role !== root) {
                throw new AuthenticationError(
                    'Must be authenticated as root to remove a client'
                );
            }

            const index = clients.findIndex(client => client.id === args.id);
            if (index === -1) {
                return false;
            }

            clients.splice(index, 1);
            return true;
        },
        authenticateAsRoot: (parent, args) => {
            if (args.password !== rootPassword) {
                throw new AuthenticationError('Incorrect password');
            }

            role = root;

            return true;
        },
        authenticateAsClient: (parent, args) => {
            const client = clients.filter(
                client => client.email == args.email && client.password == args.password
            );

            if (client.length > 1) {
                throw new ForbiddenError(
                    'The Meeshkan bank is in an inconsistent state. Sorry!'
                );
            }

            if (client.length === 0) {
                throw new AuthenticationError('Email or password incorrect');
            }

            role = client[0];

            return client[0];
        },
        sendMoney: (parent, args) => {
            if (role === root || role === unauthenticated) {
                throw new AuthenticationError('Unauthenticated as client');
            }

            const client = clients.filter((client) => client.id == args.who);
            if (client.length > 1) {
                throw new ForbiddenError(
                    'The Meeshkan bank is in an inconsistent state. Sorry!'
                );
            }

            if (client.length === 0) {
                throw new AuthenticationError('Could not find a client with id ' + client.id);
            }

            if (role.balanceInEuroCents < args.amount) {
                throw new ForbiddenError(
                    'You have insufficient funds to complete this transaction.'
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