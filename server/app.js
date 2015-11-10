'use strict';

let io = require('socket.io')(9290);

io.on('connection', socket => {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
