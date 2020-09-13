import {
	AuthenticationError,
	ForbiddenError,
} from '../../../lib/utils/errors';
import data from '../../../data';

export default (req, res) => {
	const { method } = req;

	switch (method) {
		case 'POST':
			const { email, password } = req.body;

			const client = data.clients.filter(
				(client) => client.email == email && client.password == password,
			);

			let error;

			if (client.length > 1) {
				error = new ForbiddenError(
					'The Meeshkan bank is in an inconsistent state. Sorry!',
				);
			}

			if (client.length === 0) {
				error = new AuthenticationError('Email or password incorrect');
			}

			if (error) {
				return res.status(error.status).json(error);
			}

			data.role = client[0];
			res.status(200).json({ client: client[0] });
			break;
		default:
			res.setHeader('Allow', ['POST']);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
};
