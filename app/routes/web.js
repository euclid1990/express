// Authentication and Authorization Middleware
var middleware = {
    authenticate: function(req, res, next) {
        if (req.session && req.session.user)
            return next();
        else
            return res.sendStatus(401);
    }
};

var routes = {
    Main: {
        path: '/',
        before: {
            create: middleware.authenticate
        }
    }
};

module.exports = routes;
