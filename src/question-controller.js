import Config from './config';
import io from 'socket.io-client';

class QuestionController {
  constructor() {
    this.connect();
  }

  connect() {
    this.socket = io(Config.get('questionControllerServer'));
  }

  reconnect() {
    this.socket.disconnect();
    this.connect();
  }

  waitAssignment(hit) {
    this.socket.emit('waitAssignment', hit.id);

    this.socket.on('requestContent', (hitId, assignedId) => {
      if (hitId !== hit.id) {
        return;
      }

      hit.assign(assignmentId);
    });
  }

  setContent(hit, content) {
    // XXX: server doesn't check that hit is created by this requester...
    this.socket.emit('setContent', hit.id, content)
  }
}

export default new QuestionController();
