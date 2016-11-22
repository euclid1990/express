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
        if (typeof name === 'undefined' || typeof action === 'undefined') {
            return path;
        }
        if (params instanceof Array) {
            id = params[0];
        }
        switch (action) {
            case 'index':
                path = '/';
                break;
            case 'show':
            case 'update':
            case 'destroy':
                path = `/${name}/${id}`;
                break;
            case 'create':
                path = `/${name}/create`;
                break;
            case 'store':
                path = `/${name}`;
                break;
            case 'edit':
                path = `/${name}/${id}/edit`;
                break;
            default:
                return null;
        }

        return path;
    },

    trailingSlash: function(str) {
        return str.replace(/^\/+|\/+$/g, '/');
    }
};