var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'sj';
        var text = 'Some message';
        var message = generateMessage(from, text);
        expect(message).toInclude({from, text});
        expect(message.createdAt).toBeA('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'sj';
        var latitude = 44.6380961;
        var longitude = -63.574872600000006;
        var url = `https://www.google.com/maps?q=${latitude},${longitude}`; 
        var message = generateLocationMessage(from, latitude, longitude);
        expect(message).toInclude({from, url});
        expect(message.createdAt).toBeA('number');
    });
});