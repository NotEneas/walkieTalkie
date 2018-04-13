io.on('connection', function (socket) {
    console.log("User Connected");
    socket.on('audioSend', function (audio) {
        console.log(audio);
        io.emit('audioReceive', audio);
    });

    socket.on('users', function (users) {
        console.log(users);
        io.emit('onlineUsers', users);
    });
});