import mturkTool from '../../lib/main';

mturkTool.config.set('awsAccessKeyId', process.env.AWS_ACCESS_KEY_ID);
mturkTool.config.set('awsSecretAccessKey', process.env.AWS_SECRET_ACCESS_KEY);

// reconnect when questionControllerServer is changed
mturkTool.config.set('questionControllerServer', 'http://localhost');
mturkTool.server.reconnect();

let questions = [
  "question 1",
  "question 2",
  "question 3",
  "question 4",
  "question 5",
  "question 6"
];

let workers = {};

let splitQuestions = questions => {
  let middle = questions.length / 2;
  let left = [];
  let right = [];
  questions.forEach((q, i) => {
    if (i < middle) {
      left.push(q);
    } else {
      right.push(q);
    }
  });
  return [left, right];
};
let chooseOne = questions => {
  if (questions.length > 0) {
    let size = parseInt(Math.random() * questions.length);
    return questions[size];
  } else {
    return null;
  }
};
let generateContent = (leftQuestion, rightQuestion) => {
  return `choose which one ${leftQuestion} ${rightQuestion}`;
};

let onWorkerAssigned = (hit, assignment) => {
  let workerId = assignment.worker.id;
  if (!workers[workerId]) {
    workers[workerId] = {
      nextQuestions: questions,
      answers: []
    };
  }
  let worker = workers[workerId];

  // set question on hit
  let [leftQuestions, rightQuestions] = splitQuestions(worker.nextQuestions);
  let content = generateContent(chooseOne(leftQuestions), chooseOne(rightQuestions));
  hit.setContent(content);

/*
  // TODO: use async? promise?
  let answer = hit.getAnswer();

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
*/
};

let budget = 0.04;
let hitCost = 0.02;
for (let i = 0; i < budget / hitCost; ++i) {
  let hit = mturkTool.createHIT({
    'Reward.1.Amount': hitCost
  });
  hit.on('workerAssigned', assignment => {
    onWorkerAssigned(hit, assignment);
  });
}
