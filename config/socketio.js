'use strict';
  var config = require('./config'),
    cookieParser = require('cookie-parser'),
    passport = require('passport');

module.exports = function(server, io, mongoStore) {
    io.use(function(socket, next) {
        //Use the config.sessionSecret to set up the cookieParser.
        //CookieParser returns (or used to return. See: http://www.senchalabs.org/connect/cookieParser.html) a function
        //which takes the request the response and next.
        cookieParser(config.sessionSecret)(socket.request, {}, function(err) {
            //We look up the signed cookie with the connect.sid key
            var sessionId = socket.request.signedCookies['connect.sid'];

            //we then look up this session in the mongoStore and set up the socket session to be this session
            mongoStore.get(sessionId, function(err, session) {
                socket.request.session = session;

               //set up a new passport session with this socket
                passport.initialize()(socket.request, {}, function() {
                    passport.session()(socket,request, {}, function() {
                        //check that the passport session was created properly
                        if (socket.request.user) {
                            next(null, true);
                        } else {
                            next(new Error('User is not authenticated'), false);
                        }
                    });
                });
            });
        });
    });

    io.on('connection', function(socket) {
        /* .... */
    });
};
