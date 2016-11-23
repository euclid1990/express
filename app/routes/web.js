// Authentication and Authorization Middleware
var authenticateMW = require('./../middleware/authenticate'),
    redirectIfAuthenticatedMW = require('./../middleware/redirect-if-authenticated');

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
            getRegister: redirectIfAuthenticatedMW
        }
    }
};

module.exports = routes;
