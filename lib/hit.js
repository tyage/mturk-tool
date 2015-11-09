import mturk from './mturk';
import { EventEmitter } from 'events';

export default class HIT extends EventEmitter {
  constructor(params) {
    this.params = Object.assign({
      MaxAssignments: 1,
      Title: 'sample HIT ' + new Date(), // TODO: this is sample
      Description: 'sample desc', // TODO: this is sample
      AssignmentDurationInSeconds: 30, // TODO: this is sample
      LifetimeInSeconds: 604800, // TODO: this is sample
      'Reward.1.Amount': 0.32, // TODO: this is sample
      'Reward.1.CurrencyCode': 'USD' // TODO: this is sample
    }, params);

    mturk.createHIT(this);
  }
}
