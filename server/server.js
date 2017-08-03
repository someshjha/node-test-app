const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');


var app = express();


const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
var server = http.createServer(app);
var io = socketIO(server);



app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New User connected');

    socket.on('disconnect', () => {
        console.log('Disconnected from client.');
    });
});

server.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};

// behind the scene app.listen()
// ver server = http.createServer(app);