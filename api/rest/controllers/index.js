const { v4: UUIDv4 } = require('uuid');
const {
    AuthenticationError,
    ForbiddenError,
    UserInputError,
} = require('../utils/errors');
const openapi = require('../../../openapi');
const { version } = require('../../../package');
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

const controllers = {
    getVersion: (req, res) => {
        res.json({
            version,
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
                "Must be authenticated as root to add a client"
            );
        }

        if (clients.map(client => client.name).includes(name)) {
            throw new UserInputError(
                `${name} is already a part of our clientele`
            );
        }

        if (!emailRegex.test(email)) {
            throw new UserInputError(
                "Please enter a valid email address"
            );
        }

        if (clients.map(client => client.email).includes(email)) {
            throw new UserInputError(
                `The email address ${email} is associated with an existing client`
            )
        }

        if (!(password.length >= MIN_PASSWORD_LENGTH)) {
            throw new UserInputError(
                `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`
            );
        }

        const newClient = {
            id: UUIDv4(),
            name: name,
            email: email,
            password: password,
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
            throw new AuthenticationError(`Could not find a client with id ${who}`);
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
