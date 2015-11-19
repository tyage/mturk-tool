import HIT from './hit';
import Config from './config';
import workerProxy from './worker-proxy';

var createHIT = (param) => {
  return new HIT(param);
};

export default {
  createHIT: createHIT,
  config: Config,
  server: workerProxy
};
