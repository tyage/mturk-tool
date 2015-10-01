turkSetAssignmentID();

$(function() {
  var srcQuestionChoices = $('#src-question-choices');
  var srcQuestionContents = $('#src-question-contents');
  var destQuestionChoices = $('#question-choices');
  var destQuestionContent = $('#question-content');

  // move choices into template
  destQuestionChoices.append(srcQuestionChoices.find('.choice'));

  var selectChoice = function(choice) {
    destQuestionChoices.find('.choice').removeClass('selected');
    $(choice).addClass('selected');

    var id = $(choice).data('id');
    var content = srcQuestionContents.find('.content').filter(function() {
      return $(this).data('id') === id;
    });
    destQuestionContent.html(content.html());
  };

  destQuestionChoices.find('.choice').each(function() {
    $(this).click(function() {
      selectChoice(this);
    });
  });
});
