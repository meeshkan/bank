const { unauthenticated } = require('../config/constants');

let role = unauthenticated;

const clients = [
    {
        id: '5c9cf5e4-60fa-4069-9728-bb4f660b5364',
        name: 'Mike Solomon',
        email: 'mike@meeshkan.com',
        password: 'not secure',
        balanceInEuroCents: 1492,
    },
    {
        id: 'fd800015-6d09-4469-92a2-61d8fd25723f',
        name: 'Makenna Smutz',
        email: 'makenna@meeshkan.com',
        password: 'also not secure',
        balanceInEuroCents: 1493,
    },
];

exports.role = role;
exports.clients = clients;
