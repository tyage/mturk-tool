'use strict';

let app = require('http').createServer(handler)
let io = require('socket.io')(app);

app.listen(80);

io.on('connection', socket => {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
