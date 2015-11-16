import mturk from './mturk';

let parseAssignment = assignment => {

};

export default class Assignment {
  constructor(assignment) {
    this.raw = assignment;
    this.worker = {
      id: 'test'
    };
  }

  getAnswer() {
    // wait until the assignment status changes
    let waitSecound = 30 * 1000;
    let waitHIT = (resolve, reject) => {
      mturk.getAssignment(this.id).then(result => {
        let assignment = parseAssignment(result);
        switch (assignment.AssignmentStatus) {
          case 'Submitted':
          case 'Approved':
            resolve(assignment.answer);
            break;
          case 'Rejected':
            reject();
            break;
          default:
            global.setTimeout(() => waitHIT(resolve, reject), waitSecound);
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
