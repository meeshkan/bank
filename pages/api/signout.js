import { OK, METHOD_NOT_ALLOWED } from 'http-status';
import { AuthenticationError } from '../../lib/utils/errors';
import { unauthenticated } from '../../config/constants';
import data from '../../data';

export default (req, res) => {
	const { method } = req;

	switch (method) {
		case 'POST':
			const { method } = req;

			data.role = unauthenticated;
			res.status(OK).json({ success: true });
			break;
		default:
			res.setHeader('Allow', ['POST']);
			res.status(METHOD_NOT_ALLOWED).end(`Method ${method} Not Allowed`);
	}
};
