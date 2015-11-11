import express from 'express';
import socketIo from 'socket.io';

let app = express.createServer();
app.listen(80);

app.use('/static', express.static('public'));

let io = socketIo(app);

let hitRequester = {};
let hitWorker = {};

io.on('connection', socket => {
  // requester wait until hit is assigned to worker
  socket.on('waitAssignment', hitId => {
    console.log(`requester waiting for ${hitId}`);

    hitRequester[hitId] = socket;
  });

  // worker need HIT content
  socket.on('requestContent', (hitId, assignmentId) => {
    console.log(`new worker is assigned to ${hitId} (assignmentId: ${assignmentId})`);

    let requester = hitRequester[hitId];
    hitWorker[hitId] = socket;
    if (requester) {
      // request HIT content to requester
      requester.emit('requestContent', hitId, assignmentId);
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
});
