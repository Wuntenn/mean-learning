process.env.NODE_ENV = process.env.NODE_ENV || 'development';
//console.log('Server.js sets env var: ' + process.env.NODE_ENV);

//require stuff
var mongoose = require('./config/mongoose'),
    express = require('./config/express');

//use stuff
var db = mongoose()
    app = express();

app.listen(3000);
module.exports = app;

console.log('server running on localhost:3000');
