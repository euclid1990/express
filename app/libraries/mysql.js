var mysql = require('mysql'),
    config = require('../config/database')();

module.exports = function(pool) {
    this.pool = pool;
}

module.exports = {
    connect: function(done) {
        if (this.pool) return done();

        this.pool = mysql.createPool(config);
        console.log('Created mysql database pooling.');
        if (done) done();
    },
    disconnect: function(done) {
        if (!this.pool) throw new Error('Connection not established.');
        this.pool.end(function() {
            if (done) done();
        });
    }
}