var environment = process.env.NODE_ENV || 'local';

module.exports = require('./' + environment);