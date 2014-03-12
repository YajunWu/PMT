
/**
 * Module dependencies.
 */
var express = require('express'),
    path = require('path'),
    routes = require('./routes'),
    mongoose = require('mongoose'),
    app = express.createServer(),
    settings = require('./settings');

// Configuration
app.configure(function(){
     app.set('view options', {
        layout:false
     });
    // app.set('views', __dirname + '/views');
    // app.set('view engine', 'ejs');

    app.use(express.logger('dev'));
    //app.use(express.json());
    //app.use(express.urlencoded());
    app.use(express.logger('dev'));
    app.use(express.bodyParser({ keepExtensions: true, uploadDir: './public/images' }));
    app.use(express.methodOverride());
    app.use(express.cookieParser('some-secret-value-here'));
    app.use(app.router);
    app.use('/', express.static(path.join(__dirname, 'public')));
});

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

//connect to the db server:
mongoose.connect(settings.mongodb.host, settings.mongodb.name, settings.mongodb.port,{
  user: settings.mongodb.user,
  pass: settings.mongodb.pass
});
mongoose.connection.on('open', function() {
    console.log("Connected to Mongoose...");
});

//routes list:
routes.initialize(app);

//finally boot up the server:
app.listen(settings.app.port, settings.app.host, function() {
    console.log('%s: Node server started on the %s:%s...', Date(Date.now()), settings.app.host, settings.app.port);
    console.log('databaseIP:%s, databasePORT:%s', settings.mongodb.host, settings.mongodb.port);
});
