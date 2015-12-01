import _ from 'lodash';

// functions to call when the platform is mturk

let onSubmitCallbacks = [];

let contentLoaded = () => {
  // send form to callback when the form is submitted
  let onSubmit = form => {
    _.forEach(onSubmitCallbacks, callback => {
      callback(form);
    });
  };

  _.forEach(document.getElementsByTagName('form'), form => {
    form.addEventListener('submit', () => {
      onSubmit(form);
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
