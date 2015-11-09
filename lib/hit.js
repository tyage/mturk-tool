import mturk from './mturk';
import { EventEmitter } from 'events';

export default class HIT extends EventEmitter {
  constructor(params) {
    this.params = Object.assign({
      Question: 'sample question', // XXX: this is sample
      MaxAssignments: 1,
      Title: 'sample HIT ' + new Date(), // XXX: this is sample
      Description: 'sample desc', // XXX: this is sample
      AssignmentDurationInSeconds: 30, // XXX: this is sample
      LifetimeInSeconds: 604800, // XXX: this is sample
      'Reward.1.Amount': 0.32, // XXX: this is sample
      'Reward.1.CurrencyCode': 'USD' // XXX: this is sample
    }, params);

    this.submitAndWait();
  }

  submitAndWait() {
    mturk.createHIT(this.params).then(doc => {
      let hitId = doc.querySelector('HITId').textContent;
      return mturk.waitHIT(hitId);
    }).then(({ hit, assignments }) => {
      this.emit('hitAssigned', hit, new Assignments(assignments));
    });
  }
}
