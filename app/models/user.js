var Base = require('./base'),
    model = new Base();

var User = model.extend({
    findOne: function(params, callback) {
        this.builder.select('id', 'name', 'username', 'email').from('users').where('username', params.username).limit(1).exec(function(err, rows, fields) {
            callback(err, rows);
        });
    },
    findOneByEmail: function(params, callback) {
        this.builder.select('id', 'name', 'username', 'email').from('users').where('email', params.email).limit(1).exec(function(err, rows, fields) {
            callback(err, rows);
        });
    },
    create: function(params, callback) {
        console.log(params);
        this.builder.insert({
            name: params.name,
            username: params.username,
            email: params.email,
            password: params.password,
        }).into('users').exec(function(err, rows, fields) {
            callback(err, rows);
        });
    },
});

module.exports = User;