const rootPassword = 'pa$$w0rd';
const unauthenticated = 'unauthenticated';
const root = 'root';

const MIN_PASSWORD_LENGTH = 8;
const emailRegex = /(.+)@(.+){2,}\.(.+){2,}/;

module.exports = {
	rootPassword,
	unauthenticated,
	root,
	emailRegex,
	MIN_PASSWORD_LENGTH,
};
