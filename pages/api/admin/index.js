import { OK, METHOD_NOT_ALLOWED } from 'http-status';
import { root } from '../../config/constants';
import data from '../../data';

export default (req, res) => {
	const { method } = req;

	switch (method) {
		case 'GET':
			if (data.role !== root) {
				return res.status(OK).json({ root: false });
			}

			res.status(OK).json({ root: true });
			break;
		default:
			res.setHeader('Allow', ['GET']);
			res.status(METHOD_NOT_ALLOWED).end(`Method ${method} Not Allowed`);
	}
};
