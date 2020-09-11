const { root } = require('../../config/constants');
const data = require('../../data');

export default (req, res) => {
	const { method } = req;

	switch (method) {
		case 'GET':
			if (data.role !== root) {
				return res.status(200).json({ root: false });
			}

			res.status(200).json({ root: true });
			break;
		default:
			res.setHeader('Allow', ['GET']);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
};
