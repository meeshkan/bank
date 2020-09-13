import { OK, METHOD_NOT_ALLOWED } from 'http-status';
import { AuthenticationError } from '../../lib/utils/errors';
import { root } from '../../config/constants';
import data from '../../data';

export default (req, res) => {
	const { method } = req;

	switch (method) {
		case 'GET':
			if (data.role !== root) {
				const error = new AuthenticationError('Can only fetch clients as root');
				return res.status(error.status).json(error);
			}

			res.status(OK).json({ clients: data.clients });
			break;
		default:
			res.setHeader('Allow', ['GET']);
			res.status(METHOD_NOT_ALLOWED).end(`Method ${method} Not Allowed`);
	}
};
