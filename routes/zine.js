var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/zine-db');
var articles = db.get('articles');

router.get('/zine/index', function(req, res, next) {
  articles.find({}, function(err, record) {
    res.render('zine/index', { theArticles: record });
  });
});

router.get('/zine/new-article', function(req, res, next) {
  res.render('zine/new-article');
});

router.post('/zine/index', function(req, res, next) {
  articles.insert({
    title: req.body.title,
    bgURL: req.body.background,
    bgValue: req.body.background_value,
    excerpt: req.body.excerpt,
    body: req.body.body
  });
  res.redirect('/zine/index');
});




module.exports = router;
