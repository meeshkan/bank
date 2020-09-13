import { OK, METHOD_NOT_ALLOWED } from 'http-status';
import { v4 as UUIDv4 } from 'uuid';
import {
	AuthenticationError,
	ForbiddenError,
	UserInputError,
} from '../../../lib/utils/errors';
import {
	unauthenticated,
	root,
	emailRegex,
	MIN_PASSWORD_LENGTH,
} from '../../../config/constants';
import data from '../../../data';

export default (req, res) => {
	const { method } = req;

	switch (method) {
		case 'GET':
			if (data.role === root || data.role === unauthenticated) {
				const error = new AuthenticationError('Unauthenticated as client');
				return res.status(error.status).json(error);
			}

			res.status(OK).json({ role: data.role });
			break;
		case 'POST':
			const { name, email, password, balance } = req.body;

			let error;

			if (data.role !== root) {
				error = new AuthenticationError(
					'Must be authenticated as root to add a client',
				);
			}

			if (data.clients.map((client) => client.name).includes(name)) {
				error = new UserInputError(
					`${name} is already a part of our clientele`,
				);
			}

			if (!emailRegex.test(email)) {
				error = new UserInputError('Please enter a valid email address');
			}

			if (data.clients.map((client) => client.email).includes(email)) {
				error = new UserInputError(
					`The email address ${email} is associated with an existing client`,
				);
			}

			if (!(password.length >= MIN_PASSWORD_LENGTH)) {
				error = new UserInputError(
					`Password must be at least ${MIN_PASSWORD_LENGTH} characters long`,
				);
			}

			if (error) {
				return res.status(error.status).json(error);
			}

			const newClient = {
				id: UUIDv4(),
				name: name,
				email: email,
				password: password,
				balanceInEuroCents: balance,
			};

			data.clients.push(newClient);
			res.status(OK).json({ success: true, client: newClient });
			break;
		case 'DELETE':
			const { id } = req.body;

			if (data.role !== root) {
				const error = new AuthenticationError(
					'Must be authenticated as root to remove a client',
				);

				return res.status(error.status).json(error);
			}

			const index = data.clients.findIndex((client) => client.id === id);
			if (index === -1) {
				return res.json({ success: false });
			}

			data.clients.splice(index, 1);
			res.status(OK).json({ success: true });
			break;
		default:
			res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
			res.status(METHOD_NOT_ALLOWED).end(`Method ${method} Not Allowed`);
	}
};
