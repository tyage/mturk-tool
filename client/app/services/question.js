import fs from 'fs';
import Config from '../services/config';

let appJS = fs.readFileSync(__dirname + '/../resources/app.js');
let appCSS = fs.readFileSync(__dirname + '/../resources/app.css');

let questionTemplate = (content, frameHeight) => {
  return `
<HTMLQuestion xmlns="http://mechanicalturk.amazonaws.com/AWSMechanicalTurkDataSchemas/2011-11-11/HTMLQuestion.xsd">
  <HTMLContent><![CDATA[ ${content} ]]></HTMLContent>
  <FrameHeight>${frameHeight}</FrameHeight>
</HTMLQuestion>
`
};

// XXX: escaping html is not needed
let HITPageTemplate = (content, questions) => {
  let questionSize = 2;
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv='Content-Type' content='text/html; charset=UTF-8'/>
    <script src='//s3.amazonaws.com/mturk-public/externalHIT_v1.js'></script>
    <script src='//code.jquery.com/jquery-2.1.4.min.js'></script>

    <style type="text/css">${appCSS}</style>
  </head>
  <body>

    <form name='mturk_form' method='post' id='mturk_form' action='https://www.mturk.com/mturk/externalSubmit'>
      <input type='hidden' value='' name='assignmentId' id='assignmentId'/>

      <div id="src-question-choices">
        ${questions.map((q) => `<div data-id="${q.id}" class="choice">${q.choiceHTML}</div>`).join('')}
      </div>
      <input value="" name="selected-question" id="selected-question" type="hidden" />

      <div id="src-question-contents">
        ${questions.map((q) => `<div data-id="${q.id}" class="content">${q.contentHTML}</div>`).join('')}
      </div>

      <div id="contents">
        ${content}
      </div>

      <p><input type='submit' id='submitButton' value='Submit' /></p>
    </form>

    <script>
      var questionServerEndpoint = '${Config.get('questionServerEndpoint')}';
      var questionSize = ${questionSize};
    </script>
    <script>${appJS}</script>
  </body>
</html>
`
};

class Question {
  createHITPage(content, questions) {
    return HITPageTemplate(content, questions);
  }
  createQuestion(content, questions, frameHeight = 450) {
    let page = this.createHITPage(content, questions);
    return questionTemplate(page, frameHeight);
  }
}

export default (new Question());
