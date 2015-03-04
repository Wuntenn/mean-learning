var config = require('./config'),
    express = require('express'),
    morgan = require('morgan'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    passport = require('passport'),
    flash = require('connect-flash');

module.exports = function(){
    //Start with an express app
    var app = express();

    //Now configure the express app
    
    //middleware by env type
    if (process.env.NODE_ENV == 'development'){
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
       
    //use the session middleware and initialise it with session variables.
    app.use(session({
        secret: config.sessionSecret,
        saveUninitialized: true,
        resave: true
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

    //Use express static middleware to handle files in ./public dir
    app.use(express.static('./public'));

    return app;
};
