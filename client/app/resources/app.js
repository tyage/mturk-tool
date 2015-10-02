turkSetAssignmentID();

$(function() {
  var selectedQuesion = $('#selected-question');
  var destQuestionContent = $('#question-content');
  var destQuestionChoices = $('#question-choices');

  var fetchQuestions = function(questionSize) {
    return $.ajax({
      url: window.questionServerEndpoint + '/get/' + questionSize
    });
  };

  var returnQuestions = function(questions) {
    return $.ajax({
      url: window.questionServerEndpoint + '/return',
      method: 'POST',
      data: questions
    });
  };

  var selectChoice = function(choice, question) {
    destQuestionChoices.find('.choice').removeClass('selected');
    $(choice).addClass('selected');

    selectedQuesion.val(question.id);

    destQuestionContent.html(question.contentHTML);
  };

  var createChoice = function(question) {
    var choice = $('<div />').addClass('choice');
    choice.html(question.choiceHTML);
    $(choice).click(function() {
      selectChoice(this, question);
    });
    return choice;
  };

  fetchQuestions(window.questionSize).then(function(questions) {
    // add question choices into template
    $(questions).each(function(question) {
      destQuestionChoices.append(createChoice(question));
    });

    $('#mturk_form').submit(function() {
      // return rest questions to server
      var restQuestions = $(questions).filter(function(question) {
        return question.id !== +selectedQuesion.val();
      });
      returnQuestions(restQuestions);
    });
  });
});
