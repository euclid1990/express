var User = require('../models/user'), userModel = new User();

module.exports = {
    customValidators: {
        usernameUnique: function(username) {
            if (!username.length) return true;
            return new Promise(function(resolve, reject) {
                userModel.findOne({ username: username }, function(err, result) {
                    if (err) return reject(err);
                    if (result.length) {
                        return reject(result[0]);
                    }
                    return resolve();
                });
            });
        },
        emailUnique: function(email) {
            if (!email.length) return true;
            return new Promise(function(resolve, reject) {
                userModel.findOneByEmail({ email: email }, function(err, result) {
                    if (err) return reject(err);
                    if (result.length) {
                        return reject(result[0]);
                    }
                    return resolve();
                });
            });
        }
    }
}