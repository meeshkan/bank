const { INTERNAL_SERVER_ERROR, UNAUTHORIZED } = require('http-status');

class HTTPError extends Error {
	constructor(status = INTERNAL_SERVER_ERROR, message = 'Internal server error') {
		super(message);
		this.status = status;
	}

	toJSON() {
		return {
			status: this.status,
			error: {
				message: this.message,
			},
		};
	}
}

class AuthenticationError extends HTTPError {
    constructor(message = 'Invalid authentication credentials') {
        super(UNAUTHORIZED, message);
    }
}

class ForbiddenError extends HTTPError {
    constructor(message = 'The Meeshkan bank is in an inconsistent state. Sorry!') {
        super(UNAUTHORIZED, message);
    }
}

class InternalServerError extends HTTPError {
    constructor(message = 'Internal server error.') {
        super(INTERNAL_SERVER_ERROR, message);
    }
}

module.exports = {
    AuthenticationError,
    ForbiddenError,
    InternalServerError,
};
