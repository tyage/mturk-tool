import Config from './config';
import io from 'socket.io-client';

class WorkerProxy {
  constructor() {
    this.connect();
  }

  connect() {
    this.socket = io(Config.get('workerProxyServer'));
  }

  reconnect() {
    this.socket.disconnect();
    this.connect();
  }

  waitWorker(hit) {
    this.socket.emit('waitWorker', hit.params.HITId);

    this.socket.on('requestContent', (hitId, workerId) => {
      if (hitId !== hit.params.HITId) {
        return;
      }

      hit.assignWorker(workerId);
    });

    this.socket.on('solved', (hitId, workerId, result) => {
      if (hitId !== hit.params.HITId) {
        return;
      }

      hit.resolve(workerId, result);
    });
  }

  setContent(hit, content) {
    // XXX: server doesn't check that hit is created by this requester...
    this.socket.emit('setContent', hit.params.HITId, content)
  }
}

export default new WorkerProxy();
