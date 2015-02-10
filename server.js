process.env.NODE_ENV = process.env.NODE_ENV || 'development';
console.log('Server.js sets env var: ' + process.env.NODE_ENV);

var express = require('./config/express');
var app = express();
app.listen(3000);
module.exports = app;

console.log('server running on localhost:3000');
