import Config from './config';

class QuestionController {
  constructor() {
    this.connect();
  }

  connect() {
    // TODO: connect to question controller server
  }

  // call after endpoint is changed
  reconnect() {
    // TODO
  }

  waitAssignment(hit) {
    socket.emit('waitAssignment', hit.id);
    socket.on('hitAssigned', ({ hitId, assignedId }) => {
      if (hitId !== hit.id) {
        return;
      }

      hit.assign(assignmentId);
    });
  }

  setContent(hit, content) {
    // XXX: server doesn't check that hit is created by this requester...
    socket.emit('setContent', hit.id, content)
  }
}

export default new QuestionController();
