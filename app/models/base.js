var mysql = require('../libraries/mysql'),
    queryBuilder = require('knex/lib/query/builder'),
    knex = require('knex')({ client: 'mysql'});

module.exports = function(db) {
    if (!db) db = mysql.pool;
    this.db = db;

    // Custom functions to knex
    this.builder = knex;
    queryBuilder.prototype.exec = function (callback) {
        var query = this.toString();
        return db.getConnection(function(err, connection) {
            if (typeof callback !== 'function') callback = function(){};
            if (err) return callback(err, null);
            connection.query(query, function(err, rows, fields) {
                callback(err, rows, fields) || function(){};
                connection.release();
            });
        });
    };
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