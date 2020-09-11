const openapi = require('../../openapi');

export default (_, response) => {
	return response.status(200).json(openapi);
};
