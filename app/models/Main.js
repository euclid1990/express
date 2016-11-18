var Base = require('./Base'),
    model = new Base();

var Main = model.extend({
    all: function(callback) {
        this.query('SELECT * FROM users', function(err, rows, fields) {
            callback(err, rows);
        });
    },
    count: function(callback) {
        this.query('SELECT COUNT(*) AS total FROM users', function(err, rows, fields) {
            callback(err, rows);
        });
    },
    get: function(params, callback) {
        this.query('SELECT * FROM users WHERE id = ?', params, function(err, rows, fields) {
            callback(err, rows);
        });
    },
});

module.exports = Main;