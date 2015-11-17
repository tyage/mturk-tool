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
    this.socket.emit('waitAssignment', hit.params.HITId);

    this.socket.on('requestContent', (hitId, assignmentId) => {
      if (hitId !== hit.params.HITId) {
        return;
      }

      hit.assignWorker(assignmentId);
    });
  }

  setContent(hit, content) {
    // XXX: server doesn't check that hit is created by this requester...
    this.socket.emit('setContent', hit.params.HITId, content)
  }
}

export default new QuestionController();
