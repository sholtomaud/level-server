const  JaySchema = require('jayschema');
const  jayschema = new JaySchema();
const  normaliseErrors = require('jayschema-error-messages');
const  schemas = require('./schemas');

function validateSchema(args, schema, callback){
    jayschema.validate(args, schema, function(error){
        if (error) {
            return callback(normaliseErrors(error));
        }

        callback();
    });
}

module.exports = function(validation, target, action, unsecured) {
    validation[action] = function(account, args, callback) {

        if (unsecured === true) {
            validateSchema(args, schemas[action], function(error){
                if(error){
                    return callback(error);
                }

                target.apply(null, args.concat(callback));
            });
            return;
        }

        // access.checkPermission(account.id, action, function(error) {
        //     if (error) {
        //         return callback(error);
        //     }

            validateSchema(args, schemas[action], function(error){
                if(error){
                    return callback(error);
                }

                console.log('args',args);
                args.unshift(account);

                target.apply(null, args.concat(callback));
            });
        // });
    };
};
