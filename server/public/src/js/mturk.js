import _ from 'lodash';

let onSubmitCallbacks = [];

document.addEventListener('DOMContentLoaded', () => {
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
});

export default {
  onSubmit: callback => {
    onSubmitCallbacks.push(callback);
  }
};
