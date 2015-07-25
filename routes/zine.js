var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/zine-db');
var articles = db.get('articles');
// var validations = require('../lib/validations');

router.get('/zine/index', function(req, res, next) {
  // articles.find().sort({ $natural: -1 }, function(err, record) {
  articles.find({}, function(err, record) {
    res.render('zine/index', { theArticles: record });
  });
});

router.get('/zine/new-article', function(req, res, next) {
  res.render('zine/new-article');
});

router.get('/zine/:id/article', function(req, res, next) {
  articles.findOne({ _id: req.params.id }, function(err, record) {
    res.render('zine/article', { article: record });
  });
});

router.get('/zine/:id/update', function(req, res, next) {
  articles.findOne({ _id: req.params.id }, function(err, record) {
    res.render('zine/update', { article: record });
  });
})

router.post('/zine/index', function(req, res, next) {
  var errors = validations.errors(req.body.title, req.body.excerpt, req.body.body)
  // if(errors)
  //   res.render('zine/new-article', { errorMessages: errors });
  // else {
    articles.insert({
      title: req.body.title,
      bgURL: req.body.background,
      bgValue: req.body.background_value,
      excerpt: req.body.excerpt,
      body: req.body.body
    });
    res.redirect('/zine/index');
  // }
});

router.post('/zine/:id/update', function(req, res, next) {
  articles.update({ _id: req.params.id },
    { $set:
      {
        title: req.body.title,
        bgURL: req.body.background,
        bgValue: req.body.background_value,
        excerpt: req.body.excerpt,
        body: req.body.body
      }
    });
  res.redirect('/zine/index');
});

router.post('/zine/:id/delete', function(req, res, next) {
  articles.remove({ _id: req.params.id });
  res.redirect('/zine/index');
});




module.exports = router;
