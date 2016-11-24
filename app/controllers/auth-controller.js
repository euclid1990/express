var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    async = require('async'),
    User = require('../models/user'),
    userModel = new User(),
    helper = require('../libraries/helper'),
    authValidator = require('../validators/auth-validator');

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
            if (!helper.bcryptCompare(password, user.password)) {
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
    var errors = req.flash('errors');
    res.locals.errors = helper.firstError(errors);
    res.render('register', { input: helper.flash('input', req) });
};

exports.postRegister = function(req, res, next) {
    req.body.password = helper.bcrypt(req.body.password);
    async.series([
        userModel.create.bind(userModel, req.body)
    ], function(err, results) {
        if (err) return next(err);
        req.flash('message', 'You have successfully registered');
        return res.redirect(helper.route('auth.getLogin'));
    });
};

exports.getLogout = function(req, res, next) {
    req.logout();
    return res.redirect(helper.route('main.index'));
};