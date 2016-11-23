var helper = require('../libraries/helper');

module.exports  = function(req, res, next) {
    // Redirect to main page if user is authenticated
    if (req.isAuthenticated()) {
        return res.redirect(helper.route('main.index'));
    } else {
        next();
    }
}