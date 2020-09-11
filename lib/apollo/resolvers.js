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
} = require('../../config/constants');
const data = require('../../data');

export const resolvers = {
	Query: {
		clients: () => {
			if (data.role !== root) {
				throw new AuthenticationError('Can only fetch users as root');
			}

			return data.clients;
		},
		me: () => {
			if (data.role === root || data.role === unauthenticated) {
				throw new AuthenticationError('Unauthenticated as client');
			}

			return data.role;
		},
		root: () => {
			if (data.role !== root) {
				return false;
			}

			return true;
		},
	},
	Mutation: {
		addClient: (parent, args, context) => {
			if (data.role !== root) {
				throw new AuthenticationError(
					'Must be authenticated as root to add a client',
				);
			}

			if (data.clients.map((client) => client.name).includes(args.name)) {
				throw new UserInputError(
					`${args.name} is already a part of our clientele`,
				);
			}

			if (!emailRegex.test(args.email)) {
				throw new UserInputError('Please enter a valid email address');
			}

			if (data.clients.map((client) => client.email).includes(args.email)) {
				throw new UserInputError(
					`The email address ${args.email} is associated with an existing client`,
				);
			}

			if (!(args.password.length >= MIN_PASSWORD_LENGTH)) {
				throw new UserInputError(
					`Password must be at least ${MIN_PASSWORD_LENGTH} characters long`,
				);
			}

			const newClient = {
				id: UUID(),
				name: args.name,
				email: args.email,
				password: args.password,
				balanceInEuroCents: args.balance,
			};

			data.clients.push(newClient);
			return newClient;
		},
		removeClient: (parent, args, context) => {
			if (data.role !== root) {
				throw new AuthenticationError(
					'Must be authenticated as root to remove a client',
				);
			}

			const index = data.clients.findIndex((client) => client.id === args.id);
			if (index === -1) {
				return false;
			}

			data.clients.splice(index, 1);
			return true;
		},
		authenticateAsRoot: (parent, args, context) => {
			if (args.password === rootPassword) {
				data.role = root;
				return true;
			}

			throw new AuthenticationError('Incorrect password');
		},
		authenticateAsClient: (parent, args, context) => {
			const client = data.clients.filter(
				(client) =>
					client.email == args.email && client.password == args.password,
			);

			if (client.length > 1) {
				throw new ForbiddenError(
					'The Meeshkan bank is in an inconsistent state. Sorry!',
				);
			}

			if (client.length === 0) {
				throw new AuthenticationError('Email or password incorrect');
			}

			data.role = client[0];
			return client[0];
		},
		sendMoney: (parent, args, context) => {
			if (data.role === root || data.role === unauthenticated) {
				throw new AuthenticationError('Unauthenticated as client');
			}

			const client = data.clients.filter((client) => client.id == args.who);
			if (client.length > 1) {
				throw new ForbiddenError(
					'The Meeshkan bank is in an inconsistent state. Sorry!',
				);
			}

			if (client.length === 0) {
				throw new AuthenticationError(
					'Could not find a client with id ' + args.who,
				);
			}

			if (data.role.balanceInEuroCents < args.amount) {
				throw new ForbiddenError(
					'You have insufficient funds to complete this transaction.',
				);
			}

			data.role.balanceInEuroCents -= args.amount;
			client[0].balanceInEuroCents += args.amount;
			return data.role;
		},
		signOut: () => {
			data.role = unauthenticated;
			return true;
		},
	},
};
