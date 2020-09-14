import { handler } from '../../../lib/utils/api';
import {
	AuthenticationError,
	ForbiddenError,
	MethodNotAllowedError,
} from '../../../lib/utils/errors';
import { root, unauthenticated } from '../../../config/constants';
import data from '../../../data';

const clientTransaction = (req, res) => {
	const { method } = req;

	switch (method) {
		case 'POST':
			const { who, amount } = req.body;

			if (data.role === root || data.role === unauthenticated) {
				throw new AuthenticationError('Unauthenticated as client');
			}

			const client = data.clients.filter((client) => client.id == who);
			if (client.length > 1) {
				throw new ForbiddenError(
					'The Meeshkan bank is in an inconsistent state',
				);
			}

			if (client.length === 0) {
				throw new AuthenticationError(`Could not find a client with id "${who}"`);
			}

			if (data.role.balanceInEuroCents < amount) {
				throw new ForbiddenError(
					'You have insufficient funds to complete this transaction',
				);
			}

			data.role.balanceInEuroCents -= amount;
			client[0].balanceInEuroCents += amount;
			return {
				json: { role: data.role },
			};
	}

	const allowedMethods = ['POST'];
	throw new MethodNotAllowedError(method, allowedMethods);
};

export default handler(clientTransaction);
