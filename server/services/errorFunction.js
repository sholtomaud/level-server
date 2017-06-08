var errors = require('generic-errors');

module.exports = function (callback) {
    return function (error, resource) {
        if (error) {
            return callback(error);
        }

        if(resource == null) {
            return callback(new errors.NotFound());
        }

        callback(null, resource);
    };
};