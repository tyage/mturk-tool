# MTurk tool lib

## What I do?

![](https://raw.githubusercontent.com/tyage/mturk-tool/master/screenshots/flow.png)

## Sample

```js
let mturkTool = require('mturk-tool');

mturkTool.config.set('AWSAccessKeyId', 'XXXXXXXX');
mturkTool.config.set('AWSSecretAccessKey', 'XXXXXXXX');

let questions = [ Q1, Q2, Q3, Q4, Q5, Q6 ];

let showHITWithQuestions = (hit, leftQuestion, rightQuestion) => {
  return `choose which one ${leftQuestion} ${rightQuestion}`;
};

let workers = {};

let onHitAssigned = (assignment) => {
  let workerId = assignment.worker.id;
  if (!workers[workerId]) {
    workers[workerId] = {
      nextQuestions: questions,
      answers: []
    };
  }

  // set question on hit
  let [leftQuestions, rightQuestions] = splitQuestions(worker.nextQuestions);
  let content = generateContent(chooseOne(leftQuestions), chooseOne(rightQuestions));
  this.setContent(content);

  // TODO: use async? promise?
  let answer = this.getAnswer();

  // set next questions
  if (answer.selected === 'left') {
    nextQuestions = leftQuestions;
  } else {
    nextQuestions = rightQuestions;
  }

  // update worker's state
  workers[workerId].answers.push(answer);
  // reset questions if nextQuestions has empty
  workers[workerId].nextQuestions = nextQuestions.length > 0 ? nextQuestions : questions;
};

for (i = 0; i < budget / hitCost; ++i) {
  mturkTool.createHIT().on('hitAssigned', onHitAssigned);
}
```
