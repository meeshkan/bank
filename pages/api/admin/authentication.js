const { AuthenticationError } = require('../../../lib/utils/errors');
const { rootPassword, root } = require('../../../config/constants');
const data = require('../../../data');

export default (req, res, error) => {
	const { method } = req;

	switch (method) {
		case 'POST':
			const { password } = req.body;

			if (password === rootPassword) {
				data.role = root;
				return res.status(200).json({ success: true });
			}

			const error = new AuthenticationError('Incorrect password');
			res.status(error.status).json(error);
			break;
		default:
			res.setHeader('Allow', ['POST']);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
};
