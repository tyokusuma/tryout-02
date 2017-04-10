var express = require('express');
var app = express();
var cors = require('cors');

var data = [{id: '1', text: 'gjhsdgjhsdf'}, {id: '2', text: 'world'}];

app.use(cors());

app.get('/', function(req, res) {
  res.send(data);
});

app.listen(3001, function() {
  console.log('example app port 3001!');
});
