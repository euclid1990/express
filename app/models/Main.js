var Base = require('./Base'),
    model = new Base();

var Main = model.extend({
    all: function(callback) {
        this.db.query('SELECT * FROM users', callback || function(){});
    },
});

module.exports = Main;