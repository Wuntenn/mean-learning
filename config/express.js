var express = require('express');

module.exports = function(){
    var app = express();

    //note we use the function returned by require inplace
    //with the next call. Note:app as param.
    require('../app/routes/index.server.routes')(app);
    return app;
};
