import cheerio from 'cheerio';

let parseHIT = $ => {
  return {
    hitId: $()
  };
};

let parseAnswer = $ => {
  return {};
};

let parseAssignment = $ => {
  let data = {};
  $('Assignment').children().each((i, elem) => {
    data[elem.tagName] = $(elem).text();
  });
  data.Answer = parseAnswer(cheerio.load(data.Answer), { xmlMode: true });
  return data;
};

export default {
  parseHIT,
  parseAnswer,
  parseAssignment
};
