import mturk from './mturk';
import { parseAssignment } from './parser';

export default class Assignment {
  constructor($) {
    this.raw = assignment;
    this.params = parseAssignment($);
  }

  getAnswer() {
    let waitSecound = 30 * 1000;

    // wait until the assignment status changes
    let waitHIT = (resolve, reject) => {
      mturk.getAssignment(this.params.AssignmentId).then($ => {
        let data = parseAssignment($);
        switch (data.assignmentStatus) {
          case 'Submitted':
          case 'Approved':
          case 'Rejected':
            resolve(data.answer);
            break;
          default:
            // if current time over the deadline, reject the answer
            if (data.deadline) {
              reject();
            } else {
              global.setTimeout(() => waitHIT(resolve, reject), waitSecound);
            }
            break;
        }
      }).catch(() => {
        global.setTimeout(() => waitHIT(resolve, reject), waitSecound);
      });
    };

    return new Promise((resolve, reject) => {
      waitHIT(resolve);
    });
  }
}
