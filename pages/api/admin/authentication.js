import { OK, METHOD_NOT_ALLOWED } from 'http-status';
import { AuthenticationError } from '../../../lib/utils/errors';
import { rootPassword, root } from '../../../config/constants';
import data from '../../../data';

export default (req, res, error) => {
	const { method } = req;

	switch (method) {
		case 'POST':
			const { password } = req.body;

			if (password === rootPassword) {
				data.role = root;
				return res.status(OK).json({ success: true });
			}

			const error = new AuthenticationError('Incorrect password');
			res.status(error.status).json(error);
			break;
		default:
			res.setHeader('Allow', ['POST']);
			res.status(METHOD_NOT_ALLOWED).end(`Method ${method} Not Allowed`);
	}
};
