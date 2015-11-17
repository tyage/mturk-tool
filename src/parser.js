import cheerio from 'cheerio';

let loadXML = xml => cheerio.load(xml, { xmlMode: true });

let recursiveParse = $ => {
  if ($.children().length === 0) {
    return $.text();
  } else {
    let data = {};
    $.children().each((i, elem) => {
      let key = elem.tagName;
      let value = recursiveParse($(elem));
      if (data[key] !== undefined) {
        // duplicated data will be array
        if (Array.isArray(data[key])) {
          data[key].push(value);
        } else {
          data[key] = [data[key], value];
        }
      } else {
        data[key] = value;
      }
    });
    return data;
  }
};

let parseQuestionForm = $ => {
  return recursiveParse($('QuestionForm'));
};

let parseHIT = $ => {
  let data = recursiveParse($('HIT'));
  data.Question = parseQuestionForm(loadXML(data.Question));
  return data;
};

let parseQuestionFormAnswers = $ => {
  return recursiveParse($('QuestionFormAnswers'));
};

let parseAssignment = $ => {
  let data = recursiveParse($('Assignment'));
  data.Answer = parseQuestionFormAnswers(loadXML(data.Answer));
  return data;
};

export default {
  loadXML,
  parseHIT,
  parseAssignment
};
