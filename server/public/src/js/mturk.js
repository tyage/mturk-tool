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

  $('form').each((i, form) => {
    $(form).submit(() => {
      let data = _.reduce($(form).serializeArray(), (data, param) => {
        data[param.name] = param.value;
      }, {});
      onSubmit(data);
      return false;
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
