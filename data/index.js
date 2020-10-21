import { unauthenticated } from '../config/constants';

let role = unauthenticated;

const clients = [
	{
		id: '5c9cf5e4-60fa-4069-9728-bb4f660b5364',
		name: 'Mike Solomon',
		email: 'mike@meeshkan.com',
		password: 'not secure',
		balanceInEuroCents: 1492,
		createdAt: new Date('July 15, 2020 00:20:18'),
	},
	{
		id: 'fd800015-6d09-4469-92a2-61d8fd25723f',
		name: 'Makenna Smutz',
		email: 'makenna@meeshkan.com',
		password: 'also not secure',
		balanceInEuroCents: 1493,
		createdAt: new Date('July 16, 2020 03:24:00'),
	},
];

export default {
	role,
	clients,
};
