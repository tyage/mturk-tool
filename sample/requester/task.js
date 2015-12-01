import mturkTool from '../../lib/main';

mturkTool.config.set('awsAccessKeyId', process.env.AWS_ACCESS_KEY_ID);
mturkTool.config.set('awsSecretAccessKey', process.env.AWS_SECRET_ACCESS_KEY);

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
  return `
<style>
.question {
  border: 1px solid black;
  display: inline-block;
  width: 400px;
  height: 300px;
}
</style>
<p>Choose only one question below and answer it</p>
<form>
  <div class="question">
    <p>
      <input type="radio" name="selection" value="${leftQuestion}" checked>
      question: ${leftQuestion}
    </p>
    <textarea placeholder="write a answer" name="answer"></textarea>
  </div>
  <div class="question">
    <p>
      <input type="radio" name="selection" value="${rightQuestion}">
      question: ${rightQuestion}
    </p>
    <textarea placeholder="write a answer" name="answer"></textarea>
  </div>
  <div>
    <input type="submit" value="submit">
  </div>
</form>
`;
};

let getContent = (hit, workerId) => {
  if (!workers[workerId]) {
    workers[workerId] = {
      nextQuestions: questions,
      results: []
    };
  }
  let worker = workers[workerId];

  let [leftQuestions, rightQuestions] = splitQuestions(worker.nextQuestions);
  worker.leftQuestions = leftQuestions;
  worker.rightQuestions = rightQuestions;

  return generateContent(chooseOne(leftQuestions), chooseOne(rightQuestions));
};

let onAnswer = (hit, workerId, result) => {
  let worker = workers[workerId];

  // set next questions
  if (result.selected === 'left') {
    nextQuestions = worker.leftQuestions;
  } else {
    nextQuestions = worker.rightQuestions;
  }

  // update worker's state
  workers[workerId].results.push(result);
  // reset questions if nextQuestions has empty
  workers[workerId].nextQuestions = nextQuestions.length > 0 ? nextQuestions : questions;
};

let budget = 0.02;
let hitCost = 0.02;
for (let i = 0; i < budget / hitCost; ++i) {
  let hit = mturkTool.createHIT({
    'Reward.1.Amount': hitCost
  });
  hit.on('requestContent', workerId => {
    let content = getContent(hit, workerId);
    hit.setContent(content);
  });
  hit.on('answer', (workerId, result) => {
    onAnswer(hit, workerId, result);
  });
}
