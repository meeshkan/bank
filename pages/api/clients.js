import { handler } from '../../lib/utils/api';
import {
	AuthenticationError,
	MethodNotAllowedError,
} from '../../lib/utils/errors';
import { root } from '../../config/constants';
import data from '../../data';

const clients = (req, res) => {
	const { method } = req;

	switch (method) {
		case 'GET':
			if (data.role !== root) {
				throw new AuthenticationError('Can only fetch clients as root');
			}

			return {
				json: { clients: data.clients },
			};
	}

	const allowedMethods = ['GET'];
	throw new MethodNotAllowedError(method, allowedMethods);
};

export default handler(clients);
