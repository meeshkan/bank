import { handler } from '../../../lib/utils/api';
import { root } from '../../../config/constants';
import { MethodNotAllowedError } from '../../../lib/utils/errors';
import data from '../../../data';

const admin = (req, res) => {
	const { method } = req;

	switch (method) {
		case 'GET':
			if (data.role !== root) {
				return {
					json: { root: false },
				};
			}

			return {
				json: { root: true },
			};
	}

	const allowedMethods = ['GET'];
	throw new MethodNotAllowedError(method, allowedMethods);
};

export default handler(admin);
