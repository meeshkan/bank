import { handler } from '../../../lib/utils/api';
import {
	AuthenticationError,
	MethodNotAllowedError,
} from '../../../lib/utils/errors';
import { rootPassword, root } from '../../../config/constants';
import data from '../../../data';

const adminAuth = (req, res) => {
	const { method } = req;

	switch (method) {
		case 'POST':
			const { password } = req.body;

			if (password !== rootPassword) {
				throw new AuthenticationError('Incorrect password');
			}

			data.role = root;
			return {
				json: { success: true },
			};
	}

	const allowedMethods = ['POST'];
	throw new MethodNotAllowedError(method, allowedMethods);
};

export default handler(adminAuth);
