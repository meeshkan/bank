const { AuthenticationError } = require('../../lib/utils/errors');
const { unauthenticated } = require('../../config/constants');
const data = require('../../data');

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
