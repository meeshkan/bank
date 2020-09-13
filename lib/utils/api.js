import { OK, INTERNAL_SERVER_ERROR } from 'http-status';
import { MethodNotAllowedError } from './errors';

export const handler = (controller) => {
	const apiHandler = async (req, res) => {
		try {
			const { status, json } = await controller(req, res);
			res.status(status || OK).json(json);
		} catch (error) {
			if (error instanceof MethodNotAllowedError) {
				res.setHeader('Allow', error.allowedMethods);
				return res.status(error.status).end(error.toEnd());
			}

			res.status(error.status || INTERNAL_SERVER_ERROR).json(error);
		}
	};

	return apiHandler;
};
