turkSetAssignmentID();

$(function() {
  var srcQuestionChoices = $('#src-question-choices');
  var srcQuestionContents = $('#src-question-contents');
  var destQuestionChoices = $('#question-choices');
  var destQuestionContent = $('#question-content');

  // move choices to template
  destQuestionChoices.append(srcQuestionChoices);

  var selectChoice = function(choice) {
    var id = $(choice).data('id');
    var content = srcQuestionContents.find('.content').filter(function() {
      return $(this).data('id') === id;
    });
    destQuestionContent.html(content.html());
  };

  srcQuestionChoices.find('.choice').each(function() {
    $(this).click(function() {
      selectChoice(this);
    });
  });
});
