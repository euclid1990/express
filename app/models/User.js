var Base = require('./Base'),
    model = new Base();

var User = model.extend({
    findOne: function(params, callback) {
        this.builder.select('id', 'name', 'password').from('users').where('username', params.username).limit(1).exec(function(err, rows, fields) {
            callback(err, rows);
        });
    },
});

module.exports = User;