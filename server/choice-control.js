'use strict';

var express = require('express');
var router = express.Router();

var choices = [];

router.post('/init', function(req, res, next) {
  choices = req.body;

  res.json({ 'success': true })
});

router.get('/get/:size', function(req, res, next) {
  var size = +req.params.size;
  var returnChoices = choices.slice(0, size);
  choices = choices.slice(size);

  res.json(returnChoices);
});

router.post('/return', function(req, res, next) {
  choices = choices.concat(req.body);

  res.json({ 'success': true })
});

module.exports = router;
