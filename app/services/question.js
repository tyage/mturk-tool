let questionTemplate = (content, frameHeight) => {
  return `
<HTMLQuestion xmlns="http://mechanicalturk.amazonaws.com/AWSMechanicalTurkDataSchemas/2011-11-11/HTMLQuestion.xsd">
  <HTMLContent><![CDATA[ ${content} ]]></HTMLContent>
  <FrameHeight>${frameHeight}</FrameHeight>
</HTMLQuestion>
`
};

let HITPageTemplate = (content, questions) => {
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv='Content-Type' content='text/html; charset=UTF-8'/>
    <script src='//s3.amazonaws.com/mturk-public/externalHIT_v1.js'></script>
  </head>
  <body>
    <form name='mturk_form' method='post' id='mturk_form' action='https://www.mturk.com/mturk/externalSubmit'>
      <input type='hidden' value='' name='assignmentId' id='assignmentId'/>

      <div id="choices">
        ${questions.map((q) => `<div data-id="${q.id}" class="choice">${q.choiceHTML}</div>`)}
      </div>

      <div id="contents">
        ${questions.map((q) => `<div data-id="${q.id}" class="content">${q.contentHTML}</div>`)}
      </div>

      ${content}

      <p><input type='submit' id='submitButton' value='Submit' /></p>
    </form>

    <script>turkSetAssignmentID()</script>
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
