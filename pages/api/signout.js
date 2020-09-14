import { handler } from '../../lib/utils/api';
import {
	AuthenticationError,
	MethodNotAllowedError,
} from '../../lib/utils/errors';
import { unauthenticated } from '../../config/constants';
import data from '../../data';

const signout = (req, res) => {
	const { method } = req;

	switch (method) {
		case 'POST':
			const { method } = req;

			data.role = unauthenticated;
			return {
				json: { success: true },
			};
	}

	const allowedMethods = ['POST'];
	throw new MethodNotAllowedError(method, allowedMethods);
};

export default handler(signout);
