var changeCase = require('change-case');

module.exports = {
    isRoutable: function(name, verbs) {
        for (let verb of verbs) {
            if (name.startsWith(verb)) {
                return true;
            }
        }
        return false;
    },

    getMethodData: function(name) {
        return {
            verb: module.exports.getVerb(name),
            uri: module.exports.getUri(name)
        }
    },

    getVerb: function(name) {
        var snakeName = changeCase.snakeCase(name);
        return snakeName.split('_')[0];
    },

    getUri: function(name) {
        var snakeName = changeCase.snakeCase(name);
        return changeCase.param(snakeName.split('_').slice(1).join(' '));
    },

    getRoutable: function(name) {
        verbs = [ 'get', 'post', 'put', 'patch', 'delete' ];
        if (!module.exports.isRoutable(name, verbs)) {
            return null;
        }
        return module.exports.getMethodData(name);
    }
};