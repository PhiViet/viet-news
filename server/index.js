var express = require('express');
var path = require('path');
var http = require('http');
var app = express();

app.use(express.static(path.join(__dirname, '../views')));
app.set('view engine', 'ejs');

app.listen(3000,'0.0.0.0', function(){
    console.log('listening on *:3000');
});
app.get('/', function(req, res, next) {
  return res.render('index');
});