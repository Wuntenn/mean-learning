var config = require('./config'),
    express = require('express'),
    morgan = require('morgan'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session');

module.exports = function(){
    //Start with an express app
    var app = express();

    //Now configure the express app:
    
    //middleware by env type:
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
        secret: 'sessionSecret',
        saveUninitialized: true,
        resave: true
    }));
    
    app.set('views', './app/views');
    app.set('view engine', 'ejs');
        
    //functionality of index.server.routes file used in-place w/ expess app as arguement.
    //appends routes to the express application.
    require('../app/routes/index.server.routes')(app);

    //Use express static middleware to handle files in ./public dir
    app.use(express.static('./public'));

    return app;
};
