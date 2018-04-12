io.on('connected', function (socket) {
    socket.on('audioSend', function (audio) {
        io.emit('audioReceive', audio);
    });

    socket.on('users', function (users) {
        io.emit('onlineUsers', users);
    });
});