var mysql = require('../libraries/mysql');

module.exports = function(db) {
    if (!db) db = mysql.pool;
    this.db = db;
}

module.exports.prototype = {
    extend: function(properties) {
        var child = module.exports;
        child.prototype = module.exports.prototype;
        for(var key in properties) {
            child.prototype[key] = properties[key];
        }
        return child;
    },
    setDb: function(db) {
        this.db = db;
    },
    getDb: function() {
        return this.db;
    },
    query: function(query, params, callback) {
        return this.db.getConnection(function(err, connection) {
            if (typeof params === 'function') {
                callback = params;
                params = null;
            }
            if (err) return callback(err, null);
            connection.query(query, params, function(err, rows, fields) {
                callback(err, rows, fields) || function(){};
                connection.release();
            });
        });
    }
}