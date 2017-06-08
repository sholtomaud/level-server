var services = require('../service'),
    addAction = require('./addAction');

var recordActions = {};

addAction(recordActions, services.get, 'get');
addAction(recordActions, services.getAll, 'getAll');
addAction(recordActions, services.set, 'set');
addAction(recordActions, services.batch, 'batch');
addAction(recordActions, services.del, 'del');
addAction(recordActions, services.delAll, 'delAll');

module.exports = recordActions;
