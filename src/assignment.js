import mturk from './mturk';
import { parseGetAssignmentResult } from './parser';

export default class Assignment {
  constructor(params) {
    this.params = params;
  }

  getAnswer() {
    const waitSecound = 30 * 1000;

    // wait until the assignment status changes
    let waitHIT = (resolve, reject) => {
      mturk.getAssignment(this.params.AssignmentId).then($ => {
        let data = parseGetAssignmentResult($);
        if (!data.Request.IsValid) {
          reject();
          return;
        }

        let assignment = data.Assignment;
        switch (assignment.AssignmentStatus) {
          case 'Submitted':
          case 'Approved':
          case 'Rejected':
            resolve(assignment.Answer);
            break;
          default:
            // if current time over the deadline, reject the answer
            if (assignment.Deadline) {
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
