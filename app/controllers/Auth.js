var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('../models/User'),
    userModel = new User(),
    helper = require('../libraries/helper'),
    async = require('async'),
    bcrypt = require('bcrypt');

passport.use(new LocalStrategy({
        // Prefers to name these credential field
        usernameField: 'username',
        passwordField: 'password'
    },
    function(username, password, done) {
        userModel.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user.length) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            user = user[0];
            // Uses the $2y$ prefix by default, and can check correct $2a$ passwords
            user.password = user.password.replace(/^\$2y/, "$2a");
            if (!bcrypt.compareSync(password, user.password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            // If the credentials are valid, return user that authenticated.
            return done(null, user);
        });
    }
));

// Serialize and deserialize user instances to and from the session
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

exports.getLogin = function(req, res, next) {
    res.render('login', { message: req.flash('message'), input: helper.flash('input', req) });
};

exports.postLogin = function(req, res, next) {
    passport.authenticate('local', {
        badRequestMessage: 'Missing username or password.',
    }, function(err, user, validate) {
        if (err) { return next(err); }
        if (!user) {
            req.flash('message', validate.message);
            req.flash('input', { username: req.body.username });
            return res.redirect(helper.route('auth.getLogin'));
        }
        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }
            return res.redirect(helper.route('main.index'));
        });
    })(req, res, next);
};

exports.getRegister = function(req, res, next) {
    res.render('register');
};

exports.postRegister = function(req, res, next) {

};

exports.getLogout = function(req, res, next) {
    req.logout();
    return res.redirect(helper.route('main.index'));
};