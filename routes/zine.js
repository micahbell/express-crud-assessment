var express = require('express');
var router = express.Router();
// var db = require('monk')('localhost/zine-db');
// var articles = db.???('articles');

router.get('/zine/index', function(req, res, next) {
  res.render('zine/index');
});

router.get('/zine/new-article', function(req, res, next) {
  res.render('zine/new-article');
});




module.exports = router;
