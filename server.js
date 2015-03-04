process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//require stuff
var mongoose = require('./config/mongoose'),
    express = require('./config/express'),
    passport = require('./config/passport');

//use stuff
var db = mongoose(),
    app = express(),
    passport = passport();

app.listen(3000);
module.exports = app;

console.log('server running on localhost:3000');
