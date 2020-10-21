import { v4 as UUIDv4 } from 'uuid';
import { handler } from '../../../lib/utils/api';
import {
	AuthenticationError,
	ForbiddenError,
	UserInputError,
	MethodNotAllowedError,
} from '../../../lib/utils/errors';
import {
	unauthenticated,
	root,
	emailRegex,
	MIN_PASSWORD_LENGTH,
} from '../../../config/constants';
import data from '../../../data';

const client = (req, res) => {
	const { method } = req;

	switch (method) {
		case 'GET':
			if (data.role === root || data.role === unauthenticated) {
				throw new AuthenticationError('Unauthenticated as client');
			}

			return {
				json: { role: data.role },
			};
		case 'POST':
			const { name, email, password, balance } = req.body;

			if (data.role !== root) {
				throw new AuthenticationError(
					'Must be authenticated as root to add a client',
				);
			}

			if (data.clients.map((client) => client.name).includes(name)) {
				throw new UserInputError(`${name} is already a part of our clientele`);
			}

			if (!emailRegex.test(email)) {
				throw new UserInputError('Please enter a valid email address');
			}

			if (data.clients.map((client) => client.email).includes(email)) {
				throw new UserInputError(
					`The email address ${email} is associated with an existing client`,
				);
			}

			if (!(password.length >= MIN_PASSWORD_LENGTH)) {
				throw new UserInputError(
					`Password must be at least ${MIN_PASSWORD_LENGTH} characters long`,
				);
			}

			const newClient = {
				id: UUIDv4(),
				name: name,
				email: email,
				password: password,
				balanceInEuroCents: balance,
				createdAt: new Date(),
			};

			data.clients.push(newClient);
			return {
				json: { success: true, client: newClient },
			};
		case 'DELETE':
			const { id } = req.body;

			if (data.role !== root) {
				throw new AuthenticationError(
					'Must be authenticated as root to remove a client',
				);
			}

			const index = data.clients.findIndex((client) => client.id === id);
			if (index === -1) {
				return {
					json: { success: false },
				};
			}

			data.clients.splice(index, 1);
			return {
				json: { success: true },
			};
	}

	const allowedMethods = ['GET', 'POST', 'DELETE'];
	throw new MethodNotAllowedError(method, allowedMethods);
};

export default handler(client);
