import { AuthenticationError } from '../../lib/utils/errors';
import { unauthenticated } from '../../config/constants';
import data from '../../data';

export default (req, res) => {
	const { method } = req;

	switch (method) {
		case 'POST':
			const { method } = req;

			data.role = unauthenticated;
			res.status(200).json({ success: true });
			break;
		default:
			res.setHeader('Allow', ['POST']);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
};
