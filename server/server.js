var express = require('express');
var bodyParser = require('body-parser');
var {ObjectId} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

// Middleware
app.use(bodyParser.json());

// Create a new todo
app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

// Get todos
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  })
});

// GET /todos/:id
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  // Valid id using isValid
  if (!ObjectId.isValid(id)) {
    // 404 - send back empty send
    return res.status(404).send();
  }

  // findById
  Todo.findById(id).then((todo) => {
    // success
    // if no todo - send back 404 with empty body
    if (!todo) {
      return res.status(404).send();
    }
    // if todo - send it callback
    res.send({todo});
  }).catch((e) => {
    // error
    //400 - and send empty body back
    res.status(400).send(e);
  });


});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app};
