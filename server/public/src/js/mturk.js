import _ from 'lodash';
import $ from 'jquery';

// functions to call when the platform is mturk

let onSubmitCallbacks = [];

let contentLoaded = () => {
  // send form to callback when the form is submitted
  let onSubmit = form => {
    _.forEach(onSubmitCallbacks, callback => {
      callback(form);
    });
  };

  $('form').each(form => {
    $(form).on('submit', () => {
      onSubmit($(form).serialize());
    });
  });
};

let onAnswer = callback => {
  onSubmitCallbacks.push(callback);
};

export default {
  onAnswer: onAnswer,
  contentLoaded: contentLoaded
};
