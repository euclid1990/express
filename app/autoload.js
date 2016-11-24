/**
 * Auto routing application.
 */

var express = require('express'),
    fs = require('fs'),
    path = require('path'),
    changeCase = require('change-case'),
    helper = require('./libraries/helper'),
    inspector = require('./libraries/inspector'),
    routes = require('./routes/web');

module.exports = function(parent, verbose) {
    // Routes and callbacks are stored in memory to serve all future requests
    fs.readdirSync(__dirname + '/controllers').forEach(function(name) {

        verbose && console.log('\n   %s:', name);
        var obj = require('./controllers/' + name);
        var name = obj.name || path.parse(name).name;
        // Remove suffix 'controller'
        name = changeCase.pascalCase(name.replace(/(controller)$/i, ''));
        var prefix = routes[name].path || '/',
            before = routes[name].before || null;
        var app = express();
        var handler,
            router = express.Router(),
            routeMethod,
            routePath;

        // Convert controller name to lowercase letters
        name = name.toLowerCase();
        // Allow specifying the view engine
        if (obj.engine) {
            app.set('view engine', obj.engine);
            // Add pretty-indentation whitespace to output HTML
            app.locals.pretty = true;
        }
        app.set('views', path.join(__dirname, '/views/', name));

        // Make helper function available only to the views
        app.use(function(req, res, next) {
            res.locals.helper = helper;
            res.locals.currentUser = req.isAuthenticated() ? req.session.passport.user : null;
            next();
        });

        // Generate routes based on the exported methods
        for (var key in obj) {
            // "reserved" exports
            // Using tilde before an indexOf() expression effectively gives you a truthy/falsy result
            if (~['name', 'prefix', 'engine', 'before'].indexOf(key)) continue;
            // Route exports
            switch (key) {
                case 'index':
                    routeMethod = 'get';
                    routePath = '/';
                    break;
                case 'show':
                    routeMethod = 'get';
                    routePath = '/:id';
                    break;
                case 'create':
                    routeMethod = 'get';
                    routePath = '/create';
                    break;
                case 'store':
                    routeMethod = 'post';
                    routePath = '/';
                    break;
                case 'edit':
                    routeMethod = 'get';
                    routePath = '/:id/edit';
                    break;
                case 'update':
                    routeMethod = 'put';
                    routePath = '/:id';
                    break;
                case 'delete':
                    routeMethod = 'delete';
                    routePath = '/:id';
                    break;
                default:
                    // Implicit controller routes
                    var routeable = inspector.getRoutable(key);
                    if (routeable) {
                        routeMethod = routeable.verb;
                        routePath = `/${routeable.uri}`;
                    } else {
                        // Action mapped to incorrect route
                        throw new Error('Unrecognized route: ' + name + '.' + key);
                    }
            }
            // Remove first and last slash
            routePath = helper.trailingSlash(`/${routePath}`);
            // Setup controller action
            handler = obj[key];
            // Support before middleware
            if (before && before[key]) {
                router[routeMethod](routePath, before[key], handler);
                verbose && console.log('    %s %s -> before -> %s', routeMethod.toUpperCase(), routePath, key);
            } else {
                router[routeMethod](routePath, handler);
                verbose && console.log('    %s %s -> %s', routeMethod.toUpperCase(), routePath, key);
            }
        }
        app.use(prefix, router);

        // Mount the app
        parent.use(app);

        console.log('Assign controller dynamically');
    });
};