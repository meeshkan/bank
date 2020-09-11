import SwaggerUI from 'swagger-ui-react';
import openapi from '../openapi';

const Docs = () => {
	return <SwaggerUI spec={openapi} />;
};

export default Docs;
