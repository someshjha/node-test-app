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

    // socket.emit('newEmail', {
    //     from: 'sj@example.com',
    //     text: "what's going on?",
    //     createAt: 123
    // });

    // socket.on('createEmail', (newEmail) => {
    //     console.log('createEmail', newEmail);
    // });

    // socket.emit('newMessage', {
    //     from: 'sjha',
    //     text: 'Sup',
    //     createdAt: 1234
    // });

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        // emit message to all the users 
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })
    });

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