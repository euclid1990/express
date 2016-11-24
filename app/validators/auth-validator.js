var expressValidator = require('express-validator');

module.exports = {
    postRegister: function(req, res, next) {
        var constraint = {
            name: {
                notEmpty: true,
                isLength: {
                    options: [{ min: 3, max: 50 }],
                    errorMessage: 'Name must be between 3 and 50 characters' // Error message for the validator, takes precedent over parameter message
                },
                errorMessage: 'Name is required'
            },
            username: {
                notEmpty: true,
                isLength: {
                    options: [{ min: 3, max: 30 }],
                    errorMessage: 'Userame must be between 3 and 30 characters' // Error message for the validator, takes precedent over parameter message
                },
                errorMessage: 'Username is required'
            },
            email: {
                notEmpty: true,
                isEmail: {
                    errorMessage: 'Email is invalid format'
                },
                errorMessage: 'Email is required'
            },
            password: {
                notEmpty: true,
                isLength: {
                    options: [{ min: 6, max: 30 }],
                    errorMessage: 'Name must be between 6 and 30 characters' // Error message for the validator, takes precedent over parameter message
                },
                errorMessage: 'Password is required'
            }
        };
        req.assert('password_confirmation', 'Password confirmation does not match').equals(req.body.password);
        req.checkBody(constraint);
        var errors = req.validationErrors();
        if (errors.length) {
            req.flash('errors', errors);
            req.flash('input', req.body);
            return res.redirect(req.originalUrl);
        }
        return next();
    }
}