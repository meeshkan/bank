import { handler } from '../../../lib/utils/api';
import {
	AuthenticationError,
	ForbiddenError,
	MethodNotAllowedError,
} from '../../../lib/utils/errors';
import data from '../../../data';

const clientAuth = (req, res) => {
	const { method } = req;

	switch (method) {
		case 'POST':
			const { email, password } = req.body;

			const client = data.clients.filter(
				(client) => client.email == email && client.password == password,
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
			return {
				json: { client: client[0] },
			};
	}

	const allowedMethods = ['POST'];
	throw new MethodNotAllowedError(method, allowedMethods);
};

export default handler(clientAuth);
