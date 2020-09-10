const { v4: UUIDv4 } = require('uuid');
const {
    AuthenticationError,
    ForbiddenError,
    InternalServerError,
} = require('../utils/errors');
const { INTERNAL_SERVER_ERROR } = require('http-status');
const { openapi } = require('../openapi');

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

const controllers = {
    getVersion: (req, res) => {
        res.json({
            version: '0.0.0',
        });
    },
    getOpenAPISpec: (req, res) => {
        res.json(openapi);
    },
    getClients: (req, res) => {
        if (role !== root) {
            throw new AuthenticationError('Can only fetch clients as root');
        }

        return res.json({ clients });
    },
    getCurrentClient: (req, res) => {
        if (role === root || role === unauthenticated) {
            throw new AuthenticationError('Unauthenticated as client');
        }

        return res.json({ role })
    },
    addClient: (req, res) => {
        const { name, email, password, balance } = req.body;

        if (role !== root) {
            throw new AuthenticationError(
                'Must be authenticated as root to add a client'
            );
        }

        const newClient = {
            id: UUIDv4(),
            name,
            email,
            password,
            balanceInEuroCents: balance,
        };

        clients.push(newClient);
        return res.json({ success: true, client: newClient });
    },
    removeClient: (req, res) => {
        const { id } = req.body;

        if (role !== root) {
            throw new AuthenticationError(
                'Must be authenticated as root to remove a client'
            );
        }

        const index = clients.findIndex(client => client.id === id);
        if (index === -1) {
            return res.json({ success: false });
        }

        clients.splice(index, 1);
        return res.json({ success: true })
    },
    authenticateAsRoot: (req, res) => {
        const { password } = req.body;

        if (password === rootPassword) {
            role = root;
            return res.json({ success: true });
        }

        throw new AuthenticationError('Incorrect password');
    },
    authenticateAsClient: (req, res) => {
        const { email, password } = req.body;

        const client = clients.filter(
            (client) => client.email == email && client.password == password
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
        return res.json({ client: client[0] });
    },
    sendMoney: (req, res) => {
        const { who, amount } = req.body;

        if (role === root || role === unauthenticated) {
            throw new AuthenticationError('Unauthenticated as client');
        }

        const client = clients.filter((client) => client.id == who);
        if (client.length > 1) {
            throw new ForbiddenError(
                'The Meeshkan bank is in an inconsistent state. Sorry!'
            );
        }

        if (client.length === 0) {
            throw new AuthenticationError(`Could not find a client with id ${id}`);
        }

        if (role.balanceInEuroCents < amount) {
            throw new ForbiddenError(
                'You have insufficient funds to complete this transaction.'
            );
        }

        role.balanceInEuroCents -= amount;
        client[0].balanceInEuroCents += amount;
        res.json({ role });
    },
    signOut: (req, res) => {
        role = unauthenticated;
        res.json({ success: true });
    },
};

module.exports = controllers;
