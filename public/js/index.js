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
    var formattedTime = moment(newMessage.createdAt).format('h:mm:a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: newMessage.text,
        from: newMessage.from,
        time: formattedTime
    });

    jQuery('#messages').append(html);
    // var formattedTime = moment(newMessage.createdAt).format('h:mm:a');
    // var li = jQuery('<li></li>');
    // li.text(`${newMessage.from} ${formattedTime}: ${newMessage.text}`);
    // jQuery('#messages').append(li);
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

    var messageTextBox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function() {
        messageTextBox.val('');
    });
});

socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm:a');
    
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        time: formattedTime
    });

    jQuery('#messages').append(html);
    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank">My Current location</a>');

    // li.text(`${message.from}:  ${formattedTime}`);
    // a.attr('href', message.url);
    // li.append(a);
    // jQuery('#messages').append(li);
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location');

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            lat: position.coords.latitude,
            long: position.coords.longitude
        }, function () {});
    }, function () {
        locationButton.removeAttr('disabled').text('Send location');;
        alert('Unable to fetch location.');
    });

});