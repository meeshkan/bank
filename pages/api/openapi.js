import openapi from '../../openapi';

export default (_, response) => {
	return response.status(200).json(openapi);
};
