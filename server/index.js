var express = require('express');
var app = express();
var cors = require('cors');

var data = [
  {id: '1', text: 'To Do list from server 1'},
  {id: '2', text: 'TodoList from server 2'},
];

app.use(cors());

app.get('/', function(req, res) {
  res.send(data);
});

app.listen(3001, function() {
  console.log('example app port 3001!');
});
