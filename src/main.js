import HIT from './hit';
import Config from './config';
import questionController from './question-controller';

var createHIT = (param) => {
  return new HIT(param);
};

export default {
  createHIT: createHIT,
  config: Config,
  server: questionController
};
