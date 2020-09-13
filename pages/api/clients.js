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

			res.status(200).json({ clients: data.clients });
			break;
		default:
			res.setHeader('Allow', ['GET']);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
};
