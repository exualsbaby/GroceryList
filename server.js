var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var cheerio = require('cheerio');
const util = require('util');
var app = express();
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var list = [];

const FOOD_API_RECIPES = 'https://api.food.com/external/v1/nlp/search';

app.use('/node_modules', express.static('node_modules'));
app.use('/', express.static('.'));
app.use(express.static('app'));

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index.ejs');
});

app.get('/list', function(req, res) {
    res.send(list);
});

app.post('/list', jsonParser, function(req, res) {
    if (!req.body) return res.sendStatus(400);
    var ingredients = JSON.parse(req.body.bodyText);

    /*
      TODO super duper complex comparsion and type conversion code shit
    */

    for (ingredient of ingredients) {
      console.log(ingredient);
      list.push(ingredient);
    }


    res.send(list);
});

app.post('/recipe', jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    console.log('q: ' + req.body.query);
    var requestURL = FOOD_API_RECIPES + '?searchTerm=' + req.body.query + '&pn=1&sortBy=recommended';

    request(requestURL, function(error, response, html) {
      if (!error) {
        var result = JSON.parse(html);
        res.send(JSON.stringify(result));
      } else {
        console.log(error);
        res.sendStatus(400);
      }
    });
});

app.post('/recipe/add', jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  if (!req.body.url) return res.sendStatus(200);

  request(req.body.url, function(error, response, html) {
    if (!error) {
      var $ = cheerio.load(html);
      var results = [];

      $('li[data-ingredient]').each(function(i, element) {
        console.log($(this).html());
        var cleanedResult = '';
        cleanedResult += $(this).html().replace(/<(?!a\s*\/?)[^>]+>/g, '').trim();
        cleanedResult += '</a>';
        results.push(cleanedResult);
        console.log(cleanedResult);
      });

      res.send(results);
    } else {
      console.log(error);
      res.sendStatus(400);
    }
  });
});

app.listen(3030, function() {
  console.log('runnin on 3030');
});
