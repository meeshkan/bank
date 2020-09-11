exports.openapi = {
	openapi: '3.0.0',
	servers: [
		{
			description: 'Localhost rules!',
			url: process.env.GAE_ENV
				? 'http://meeshkan.io/api'
				: 'http://localhost:3000/api',
		},
	],
	info: {
		description: 'The great and Mighty Meeshkan Bank!',
		version: '0.0.0',
		title: 'Simple Inventory API',
		contact: {
			email: 'mike@meeshkan.com',
		},
		license: {
			name: 'Apache 2.0',
			url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
		},
	},
	paths: {
		'/version': {
			get: {
				tags: ['developers'],
				summary: 'gets the version',
				operationId: 'getVersion',
				description: 'Wanna know the version of the Meeshkan Bank? Use this!\n',
				responses: {
					200: {
						description: 'The version.',
						content: {
							'application/json': {
								schema: {
									type: 'object',
									properties: {
										version: {
											type: 'string',
										},
									},
								},
							},
						},
					},
					400: {
						description: 'Bad input parameter.',
					},
				},
			},
		},
	},
};
