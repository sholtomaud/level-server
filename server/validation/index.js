// var flatMergeN = require('flat-merge-n'),
//     actions = flatMergeN(
//         // require('./authentication'),
//         require('./record')
//         // ,
//         // require('./schema'),
//         // require('./translation'),
//         // require('./view')
//     );
//
// module.exports = actions;

var services = require('../services'),
    addValidation = require('./addValidation');

var validation = {};

addValidation(validation, services.get, 'get');
addValidation(validation, services.getAll, 'getAll');
addValidation(validation, services.set, 'set');
addValidation(validation, services.batch, 'batch');
addValidation(validation, services.del, 'del');
addValidation(validation, services.delAll, 'delAll');

module.exports = validation;

// if (unsecured === true) {
//     validateSchema(args, schemas[action], function(error){
//         if(error){
//             return callback(error);
//         }
//
//         target.apply(null, args.concat(callback));
//     });
//     return;
// }
