import { handler } from '../../lib/utils/api';
import { MethodNotAllowedError } from '../../lib/utils/errors';
import { version as currentVersion } from '../../package.json';

const version = (req, res) => {
	const { method } = req;

	switch (method) {
		case 'GET':
			return {
				json: {
					version: currentVersion,
				},
			};
	}

	const allowedMethods = ['GET'];
	throw new MethodNotAllowedError(method, allowedMethods);
};

export default handler(version);
