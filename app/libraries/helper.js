// Module exports forward declaration
module.exports = function() {};

module.exports = {
    twodigit: function(value) {
        return `0${value}`.slice(-2);
    },

    formatDate: function(string) {
        var dt = new Date(string),
            d = module.exports.twodigit(dt.getDate());
            m = module.exports.twodigit(dt.getMonth() + 1),
            y = dt.getFullYear();
        return (`${y}-${m}-${d}`);
    },

    formatDatetime: function(string) {
        var dt = new Date(string),
            d = module.exports.twodigit(dt.getDate());
            m = module.exports.twodigit(dt.getMonth() + 1),
            y = dt.getFullYear(),
            h = module.exports.twodigit(dt.getHours()),
            i = module.exports.twodigit(dt.getMinutes()),
            s = module.exports.twodigit(dt.getSeconds());
        return (`${y}-${m}-${d} ${h}:${i}:${s}`);
    },

    route: function(resource, params = []) {
        var [name, action] = resource.split('.'),
            path = '',
            id = params;
        var route = routes[module.exports.ucfirst(name)];
        if (route === 'undefined') return null;
        var prefix = route.path || '/';

        if (typeof name === 'undefined' || typeof action === 'undefined') {
            return path;
        }
        if (params instanceof Array) {
            id = params[0];
        }
        switch (action) {
            case 'index':
                path = `/${prefix}`;
                break;
            case 'show':
            case 'update':
            case 'destroy':
                path = `/${prefix}/${id}`;
                break;
            case 'create':
                path = `/${prefix}/create`;
                break;
            case 'store':
                path = `/${prefix}`;
                break;
            case 'edit':
                path = `/${prefix}/${id}/edit`;
                break;
            default:
                var routeable = inspector.getRoutable(action);
                if (routeable) {
                    path = prefix + '/' + routeable.uri;
                } else {
                    // Action mapped to incorrect route
                    return null;
                }
        }
        path = module.exports.trailingSlash(path);
        return path;
    },

    trailingSlash: function(str) {
        return str.replace(/^\/+|\/+$/g, '/');
    },

    ucfirst: function(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    old: function(key, input, defaultvalue = null) {
        if (input && typeof input[key] !== "undefined") {
            return input[key];
        }
        return defaultvalue;
    },

    flash: function(key, request) {
        var data = request.flash(key);
        if (data.length) {
            return data.shift();
        }
        return null;
    },

    stringify: function(obj) {
        return JSON.stringify(obj, null, 2);
    },

    bcryptCompare: function(plaintext, hash) {
        // Uses the $2y$ prefix by default, and can check correct $2a$ passwords
        hash = hash.replace(/^\$2y/, "$2a");
        return bcrypt.compareSync(plaintext, hash);
    },

    bcrypt: function(plaintext, saltRounds = 10) {
        var salt = bcrypt.genSaltSync(saltRounds);
        var hash = bcrypt.hashSync(plaintext, salt);
        return hash.replace(/^\$2a/, "$2y");
    },

    firstError: function(arr) {
        var keys = [], result = [];
        for (var val of arr) {
            if (~keys.indexOf(val.param)) continue;
            keys.push(val.param);
            result.push(val);
        }
        return result;
    }
};

/**
 * Prevent circular require dependencies
 * Load order: {libraries/helper} > {middlewares/authenticate} > {routes/web} modules
 */
var inspector = require('./inspector'),
    routes = require('../routes/web'),
    changeCase = require('change-case'),
    bcrypt = require('bcrypt');