var Hapi = require('hapi');
var Mongoose = require('mongoose');

var server = new Hapi.Server();
server.connection({ port : 80, routes: { cors: true } });

Mongoose.connect('mongodb://localhost/playlist', function(err){
	if(err){
		console.log('DB connection error : ' + err);
	}
});

server.views({
    engines: {
        html: require('ejs')
    },
    path: './view'
});

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: 'public',
            listing: true
        }
    }
});

server.route({
    method : 'GET',
    path : '/',
    handler : function(req, reply){
        reply.view('index');
    }
});

var plugins = [
    { register: require('./plugin/media') },
		{ register: require('./plugin/playlist') }
];

// Register plugins, and start the server if none of them fail
server.register(plugins, function (err) {
    if (err) { throw err; }

    server.start(function () {
        console.log('info', 'Server running at: ' + server.info.uri);
    });
});
