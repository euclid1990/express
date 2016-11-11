var mysql = require('../libraries/mysql');

module.exports = function(db) {
    if (!db) db = mysql.conn;
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
    }
}