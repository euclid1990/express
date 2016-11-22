/**
 * Module dependencies.
 */

var express = require('express'),
    fs = require('fs'),
    path = require('path'),
    helper = require('./libraries/helper'),
    inspector = require('./libraries/inspector'),
    routes = require('./routes/web'),
    mysql = require('./libraries/mysql');

module.exports = function(parent, options) {
    mysql.connect(function() {

        // Define option parameters
        var io = options.io,
            verbose = options.verbose;
        // Routes and callbacks are stored in memory to serve all future requests
        fs.readdirSync(__dirname + '/controllers').forEach(function(name) {

            verbose && console.log('\n   %s:', name);
            var obj = require('./controllers/' + name);
            var name = obj.name || path.parse(name).name;
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
            if (obj.engine) app.set('view engine', obj.engine);
            app.set('views', path.join(__dirname, '/views/', name));

            // Generate routes based on the exported methods
            for (var key in obj) {
                // "reserved" exports
                // Using tilde before an indexOf() expression effectively gives you a truthy/falsy result
                if (~['name', 'prefix', 'engine', 'before'].indexOf(key)) continue;
                // Route exports
                switch (key) {
                    case 'index':
                        routeMethod = 'get';
                        routePath = prefix;
                        break;
                    case 'show':
                        routeMethod = 'get';
                        routePath = prefix + '/:id';
                        break;
                    case 'create':
                        routeMethod = 'get';
                        routePath = prefix + '/create';
                        break;
                    case 'store':
                        routeMethod = 'post';
                        routePath = prefix;
                        break;
                    case 'edit':
                        routeMethod = 'get';
                        routePath = prefix + '/:id/edit';
                        break;
                    case 'update':
                        routeMethod = 'put';
                        routePath = prefix + '/:id';
                        break;
                    case 'delete':
                        routeMethod = 'delete';
                        routePath = prefix + '/:id';
                        break;
                    default:
                        // Implicit controller routes
                        var routeable = inspector.getRoutable(key);
                        if (routeable) {
                            routeMethod = routeable.verb;
                            routePath = prefix + '/' + routeable.uri;
                        } else {
                            // Action mapped to incorrect route
                            throw new Error('Unrecognized route: ' + name + '.' + key);
                        }
                }
                // Remove first and last slash
                routePath = helper.trailingSlash(routePath);
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
            app.use(router);

            // Mount the app
            parent.use(app);
        });
        console.log('Assign controller dynamically');

        // Listen on the connection event for incoming sockets
        io.on('connection', function(socket){
            console.log('A user connected');
            socket.on('disconnect', function(){
                console.log('A user disconnected');
            });
        });
    });
};