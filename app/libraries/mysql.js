var mysql = require('mysql'),
    config = require('../config/database')();

module.exports = function(conn) {
    this.conn = conn;
}

module.exports = {
    connect: function(done) {
        if (this.conn) return done();

        var connection = mysql.createConnection(config);
        connection.connect(function(err) {
            if (err) throw err
            console.log('Connected mysql database.')
        });

        this.conn = connection;
        if (done) done();
    },
    disconnect: function(done) {
        if (!this.conn) throw new Error('Connection not established.');
        this.conn.end();
        if (done) done();
    }
}