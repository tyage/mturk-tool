import HIT from './hit';
import Config from './config';

var createHIT = (param) => {
  return new HIT(param);
};

export default {
  createHIT: createHIT,
  config: Config
};
