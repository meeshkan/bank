import { OK } from 'http-status';
import { version } from '../../package.json';

export default (_, response) => {
	return response.status(OK).json({
		version,
	});
};
