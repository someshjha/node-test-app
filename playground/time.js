const moment = require('moment');

// Jan 1st 1970 00:00:00 am

// var date = new Date();
// var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// console.log(date.getMonth());

var sometimestapm = moment().valueOf();
console.log(sometimestapm);
var createdAt = 1234;
var date = moment(createdAt);
//date.add(100, 'year').subtract(8, 'months');
console.log(date.format('h:mm a'));