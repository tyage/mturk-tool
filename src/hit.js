import mturk from './mturk';
import questionController from './question-controller';
import Config from './config';
import defaultQuestion from './default-question'
import Assignment from './assignment';
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
      LifetimeInSeconds: 604800, // XXX: this is sample
      'Reward.1.Amount': 0.32, // XXX: this is sample
      'Reward.1.CurrencyCode': 'USD' // XXX: this is sample
    }, params);

    this.submitAndWait();
  }

  submitAndWait() {
    // submit to mturk and wait assignment event from question controller
    mturk.createHIT(this.params).then(doc => {
      this.id = doc.querySelector('HITId').textContent;

      questionController.waitAssignment(this);
    });
  }

  assignWorker(assignmentId) {
    mturk.getAssignment(assignmentId).then(assignment => {
      this.emit('workerAssigned', new Assignment(assignment));
    });
  }

  setContent(content) {
    questionController.setContent(this, content);
  }
}
