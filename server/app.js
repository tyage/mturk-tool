'use strict';

let io = require('socket.io')(80);

let hitRequester = {};
let hitWorker = {};

io.on('connection', socket => {
  // requester wait until hit is assigned to worker
  socket.on('waitAssignment', hitId => {
    hitRequester[hitId] = socket;
  });

  // worker need HIT content
  socket.on('requestContent', (hitId, assignmentId) => {
    let requester = hitRequester[hitId];
    hitWorker[hitId] = socket;
    if (requester) {
      // request HIT content to requester
      requester.emit('requestContent', hitId, assignmentId);
    }
  });

  // requester response HIT content
  socket.on('setContent', (hitId, content) => {
    let worker = hitWorker[hitId];
    if (worker) {
      worker.emit('setContent', hitId, content);
    }
  });
});
