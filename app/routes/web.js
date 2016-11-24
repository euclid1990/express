// Authentication, Authorization, Validator Middleware
var authenticateMW = require('./../middleware/authenticate'),
    redirectIfAuthenticatedMW = require('./../middleware/redirect-if-authenticated'),
    authValidator = require('../validators/auth-validator');

var routes = {
    Main: {
        path: '/',
        before: {
            create: authenticateMW
        }
    },
    Auth: {
        path: '/auth',
        before: {
            getLogin: redirectIfAuthenticatedMW,
            getRegister: redirectIfAuthenticatedMW,
            postRegister: [ redirectIfAuthenticatedMW, authValidator.postRegister ]
        }
    }
};

module.exports = routes;
