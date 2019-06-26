var express = require('express');
var path = require('path');
var http = require('http');
var app = express();
var cheerio = require('cheerio');
var bodyParser = require('body-parser');
// var iconv = require('iconv-lite');

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.json());

var request = require("request");

app.use(express.static(path.join(__dirname, '../views')));
app.set('view engine', 'ejs');

app.listen(3000, '0.0.0.0', function () {
  console.log('listening on *:3000');
});
app.get('/', function (req, res, next) {
  var articles = [];
  request({ uri: "https://news.zing.vn/mobile.html", gzip: true },
    function (error, response, body) {
      var $ = cheerio.load(body);
      $('.article-item').each(function () {
        var article = {};

        article.title = $(this).find('.article-title').text().trim();
        article.href = $(this).find('.article-thumbnail>a').attr('href');
        article.thumb = $(this).find('.article-thumbnail>a>img').attr('src');
        article.summary = $(this).find('.article-summary').text();
        article.publish = {
          time: $(this).find('.time').text(),
          date: $(this).find('.date').text(),
        }

        articles.push(article);
      });
      console.log(articles);
      return res.render('index', {
        articles: articles,
      });
    });
});