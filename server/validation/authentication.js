var services = require('../services'),
    addAction = require('./addAction');

var authenticationActions = {};

addAction(authenticationActions, services.authentication.login, 'authentication.login', true);
addAction(authenticationActions, services.authentication.createAccount, 'authentication.createAccount', true);

module.exports = authenticationActions;