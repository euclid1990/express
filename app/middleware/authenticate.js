var helper = require('../libraries/helper');

module.exports  = function(req, res, next) {
    // if user is authenticated in the session
    if (req.isAuthenticated()) {
        res.locals.user = req.session.passport.user;
        next();
    } else {
        // if they aren't logged in redirect them to login page
        return res.redirect(helper.route('auth.getLogin'));
    }
}