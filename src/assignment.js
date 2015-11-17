import mturk from './mturk';
import cheerio from 'cheerio';

let parseAnswer = $ => {
  return {};
};

let parseAssignment = $ => {
  let rawAnswer = $('Answer').text();
  return {
    assignmentId: $('AssignmentId').text(),
    workerId: $('WorkerId').text(),
    hitId: $('HITId').text(),
    assignmentStatus: $('AssignmentStatus').text(),
    deadline: $('Deadline').text(),
    acceptTime: $('AcceptTime').text(),
    submitTime: $('SubmitTime').text(),
    answer: parseAnswer(c.load(rawAnswer))
  };
};

export default class Assignment {
  constructor($) {
    this.raw = assignment;
    this.params = parseAssignment($);
  }

  getAnswer() {
    let waitSecound = 30 * 1000;

    // wait until the assignment status changes
    let waitHIT = (resolve, reject) => {
      mturk.getAssignment(this.id).then($ => {
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
