import mturk from './mturk';

export default class HIT {
  constructor(params) {
    this.params = Object.assign({
      // TODO
    }, params);

    mturk.createHIT(this);
  }
}
