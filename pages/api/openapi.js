import { handler } from '../../lib/utils/api';
import { MethodNotAllowedError } from '../../lib/utils/errors';
import openapi from '../../openapi';

const openAPI = (req, res) => {
	const { method } = req;

	switch (method) {
		case 'GET':
			return {
				json: openapi,
			};
	}

	const allowedMethods = ['GET'];
	throw new MethodNotAllowedError(method, allowedMethods);
};

export default handler(openAPI);
