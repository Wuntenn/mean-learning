/* jshint node: true */
"use strict";

module.exports = function(io, socket) {
    io.emit('chatMessage', {
        type: 'status',
        text: 'connected',
        created: Date.now(),
        username: socket.request.user.username
    });

    socket.on('chatMessage', function(message) {
        //take the message from the user, timestamp it and append
        //their credentials
        message.type = 'message';
        message.created = Date.now();
        message.username = socket.request.user.username;

        //now broadcast this message to the other users 
        io.emit('chatMessage', message);
    });

    socket.on('disconnect', function() {
       io.emit('chatMessage', {
           type: 'status',
           text: 'disconnected',
           created: Date.now(),
           username: socket.request.user.username
       }); 
    });
};
