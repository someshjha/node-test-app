var socket = io();
socket.on('connect', function () {
    console.log('Connected to server');

    // socket.emit('createEmail', {
    //     to: 'jen@example.com',
    //     text: 'Hey, This is Jen'
    // });

    // socket.emit('createMessage', {
    //     from: 'Jlo',
    //     text: 'sup sup sup'
    // });

    // socket.emit('newUser', {});
    // socket.on('welcomeMessage', function(message) {
    //     console.log(message);
    // });

    // socket.on('newUser', function(message) {
    //     console.log(message);
    // });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server.');
});

socket.on('newMessage', function (newMessage) {
    console.log('NewMessage', newMessage);
    var li = jQuery('<li></li>');
    li.text(`${newMessage.from}: ${newMessage.text}`);
    jQuery('#messages').append(li);
});

// socket.on('newEmail', function(email) {
//     console.log('New Email', email);
// });

// socket.emit('createMessage', {
//     from: 'frank',
//     text: 'Hi!'
// }, function (data) {
//     console.log('Got it', data);
// });

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function() {

    });
});