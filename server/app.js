import express from 'express';
import http from 'http';
import socketIo from 'socket.io';

let app = express();
let server = http.Server(app);
let io = socketIo(server);

server.listen(process.env.PORT || 80);

app.use('/static', express.static('public/dist'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

let hitRequester = {};
let hitWorker = {};

io.on('connection', socket => {
  // requester wait until hit is assigned to worker
  socket.on('waitWorker', hitId => {
    console.log(`requester waiting for ${hitId}`);

    hitRequester[hitId] = socket;
  });

  // worker need HIT content
  socket.on('requestContent', (hitId, workerId) => {
    console.log(`new worker ${workerId} is assigned to ${hitId}`);

    let requester = hitRequester[hitId];
    hitWorker[hitId] = socket;
    if (requester) {
      // request HIT content to requester
      requester.emit('requestContent', hitId, workerId);
    }
  });

  // requester response HIT content
  socket.on('setContent', (hitId, content) => {
    console.log(`requester response content to ${hitId}`);

    let worker = hitWorker[hitId];
    if (worker) {
      worker.emit('setContent', hitId, content);
    }
  });

  // worker solve HIT
  socket.on('solve', (hitId, workerId, result) => {
    console.log(`worker ${workerId} solved ${hitId}`);

    let requester = hitRequester[hitId];
    if (requester) {
      requester.emit('solve', hitId, workerId, result);
    }
  });
});
