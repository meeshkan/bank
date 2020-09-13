import {
	AuthenticationError,
	ForbiddenError,
} from '../../../lib/utils/errors';
import { root, unauthenticated } from '../../../config/constants';
import data from '../../../data';

export default (req, res) => {
	const { method } = req;

	switch (method) {
		case 'POST':
			const { who, amount } = req.body;

			let error;

			if (data.role === root || data.role === unauthenticated) {
				error = new AuthenticationError('Unauthenticated as client');
			}

			const client = data.clients.filter((client) => client.id == who);
			if (client.length > 1) {
				error = new ForbiddenError(
					'The Meeshkan bank is in an inconsistent state. Sorry!',
				);
			}

			if (client.length === 0) {
				error = new AuthenticationError(
					`Could not find a client with id ${who}`,
				);
			}

			if (data.role.balanceInEuroCents < amount) {
				error = new ForbiddenError(
					'You have insufficient funds to complete this transaction.',
				);
			}

			if (error) {
				return res.status(error.status).json(error);
			}

			data.role.balanceInEuroCents -= amount;
			client[0].balanceInEuroCents += amount;
			res.status(200).json({ role: data.role });
			break;
		default:
			res.setHeader('Allow', ['POST']);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
};
