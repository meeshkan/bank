import { OK } from 'http-status';
import openapi from '../../openapi';

export default (_, response) => {
	return response.status(OK).json(openapi);
};
