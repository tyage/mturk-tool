import config from './config';

class QuestionController {
  constructor() {
    // TODO: connect to question controller server
  }

  // call after endpoint is changed
  reconnect() {
    // TODO
  }

  waitAssignment(hit) {
    // XXX: server doesn't check that hit is created by this requester...
    socket.emit('waitAssignment', hit.id);
    socket.on('hitAssigned', ({ hitId, assignedId }) => {
      if (hitId !== hit.id) {
        return;
      }

      hit.assign(assignmentId);
    })
  }

  setContent(hit, content) {
    socket.emit('setContent', hit.id, content)
  }
}

export default new QuestionController();
