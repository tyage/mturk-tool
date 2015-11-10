'use strict';

let express = require('express');
let router = express.Router();

let choices = [];

router.post('/init', (req, res, next) => {
  choices = req.body;

  res.json({ 'success': true })
});

router.get('/get/:size', (req, res, next) => {
  let size = +req.params.size;
  let returnChoices = choices.slice(0, size);
  choices = choices.slice(size);

  res.json(returnChoices);
});

router.post('/return', (req, res, next) => {
  choices = choices.concat(req.body);

  res.json({ 'success': true })
});

module.exports = router;
