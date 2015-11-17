import cheerio from 'cheerio';

let loadXML = xml => cheerio.load(xml, { xmlMode: true });

let recursiveParse = $ => {
  if ($.children().length === 0) {
    return $.text();
  } else {
    let data = {};
    $.children().each((i, elem) => {
      data[elem.tagName] = recursiveParse($(elem));
    });
    return data;
  }
};

let parseQuestion = $ => {
};

let parseHIT = $ => {
  let data = recursiveParse($('HIT'));
  data.Question = parseQuestion(loadXML(data.Question));
  return data;
};

let parseAnswer = $ => {
};

let parseAssignment = $ => {
  let data = recursiveParse($('Assignment'));
  data.Answer = parseAnswer(loadXML(data.Answer));
  return data;
};

export default {
  loadXML,
  parseHIT,
  parseAnswer,
  parseAssignment
};
