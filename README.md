# MTurk tool lib

```js
let mturkTool = require('mturk-tool');

let questions = [ Q1, Q2, Q3, Q4, Q5, Q6 ];

let showHITWithQuestions = (hit, leftQuestion, rightQuestion) => {
  hit.setContent(`
choose which one ${leftQuestion} ${rightQuestion}
`);
};

let onHitAssigned = (hit, worker) => {
  // set question on hit and get answer
  let nextQuestions = worker.state.nextQuestions || questions;
  let [leftQuestions, rightQuestions] = splitQuestions(nextQuestions);
  showHITWithQuestions(hit, chooseOne(leftQuestions), chooseOne(rightQuestions));
  let answer = hit.getAnswer();

  // set next questions
  if (answer.selected === 'left') {
    nextQuestions = leftQuestions;
  } else {
    nextQuestions = rightQuestions;
  }

  // update worker's state
  worker.state.answers.push(answer);
  // reset questions if nextQuestions has empty
  worker.state.nextQuestions = nextQuestions.length > 0 ? nextQuestions : questions;
};

for (i = 0; i < budget / hitCost; ++i) {
  mturkTool.createHIT().on('hitAssigned', onHitAssigned);
}
```
