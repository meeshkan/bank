const { version } = require('../../package.json');

export default (_, response) => {
    return response.status(200).json({
        version,
    });
};
