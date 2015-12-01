import mturk from './mturk';
import workerProxy from './worker-proxy';
import Config from './config';
import defaultQuestion from './default-question'
import Assignment from './assignment';
import { parseHIT, parseGetAssignmentResult } from './parser';
import { EventEmitter } from 'events';

export default class HIT extends EventEmitter {
  constructor(params = {}) {
    super();

    this.params = Object.assign({
      Question: mturk.generateQuestionXML(defaultQuestion()),
      MaxAssignments: 1,
      Title: 'sample HIT ' + new Date(), // XXX: this is sample
      Description: 'sample desc', // XXX: this is sample
      AssignmentDurationInSeconds: 30, // XXX: this is sample
      LifetimeInSeconds: 3600, // XXX: this is sample
      'Reward.1.Amount': 0.32, // XXX: this is sample
      'Reward.1.CurrencyCode': 'USD' // XXX: this is sample
    }, params);

    this.submitAndWait();
  }

  submitAndWait() {
    // submit to mturk and wait assignment event from question controller
    mturk.createHIT(this.params).then($ => {
      let params = parseHIT($);
      this.params = params;
      if (params.HITId !== '') {
        workerProxy.waitWorker(this);
      }
    });
  }

  assignWorker(workerId) {
    console.log(`new worker ${workerId} is assigned to ${this.params.HITId}`);
    this.emit('requestContent', workerId);
  }

  resolve(workerId, result) {
    this.emit('resolve', workerId, result);
  }

  setContent(content) {
    workerProxy.setContent(this, content);
  }
}
