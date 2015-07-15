'use strict';
  var config = require('./config'),
    http = require('http'),
    socketio = require('socket.io'),
    express = require('express'),
    morgan = require('morgan'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    flash = require('connect-flash'),
    passport = require('passport');

module.exports = function(db) {
    //Start with an express app
    var app = express(),
        server = http.createServer(app),
        io = socketio.listen(server);

    //Now configure the express app

    //middleware by env type
    if (process.env.NODE_ENV == 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV == 'production') {
        app.use(compression());
    }
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    //middleware used regardless of env:
    app.use(bodyParser.json());
    app.use(methodOverride());

    //create the mongo store using connect-mongo.
    //this is used to store the session in mongo
    //different from the book because of update:
    //https://github.com/kcbanner/connect-mongo#connection-to-mongodb
    var mongoStore = new MongoStore({
        mongooseConnection: db.connection
    });

    //use the session middleware and initialise it with session variables.
    app.use(session({
        resave: true,
        saveUninitialized: true,
        secret: config.sessionSecret,
        store: mongoStore
    }));

    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    app.use(flash());

    app.use(passport.initialize());
    app.use(passport.session());

    //functionality of index.server.routes file used in-place w/ expess app as arguement.
    //appends routes to the express application.
    require('../app/routes/index.server.routes')(app);
    require('../app/routes/users.server.routes')(app);
    require('../app/routes/articles.server.routes')(app);

    //Use express static middleware to handle files in ./public dir
    app.use(express.static('./public'));

    //set up the socket io from the socketio config and pass in the nodejs server wrapper that
    //wraps this express server, the socket io server that wraps the nodejs server (that wraps express)
    //and access to teh mongo store.
    require('./socketio')(server, io, mongoStore);

    return server;
};
