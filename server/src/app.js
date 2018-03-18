const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const config = require('config');

const app = express();

// only use morgan outside of testing
if (config.util.getEnv('NODE_ENV') !== 'test') {
  app.use(morgan('combined'));
}
app.use(bodyParser.json());
app.use(cors());

const mongodbConnModule = require('./mongodbConnModule');
mongodbConnModule.connect();

const Todo = require('../models/todo');

app.get('/todos', (req, res) => {
  Todo.find({}, 'status description', function (err, todos) {
    if (err) {
      res.status(500).send(err);
    }
    res.send({
      todos: todos
    });
  }).sort({_id: -1});
});

app.get('/todos/:id', (req, res) => {
  Todo.findById(req.params.id, 'status description', function (err, todo) {
    if (err) {
      res.status(500).send(err);
    }
    res.send({
      success: true,
      todo: todo
    });
  });
});

app.post('/todos', (req, res) => {
  const status = req.body.status;
  const description = req.body.description;
  const newTodo = new Todo({
    status: status,
    description: description
  });

  newTodo.save(function (err, todo) {
    if (err) {
      res.status(500).send(err);
    }
    res.send({
      success: true,
      todo: todo
    });
  });
});

app.put('/todos/:id', (req, res) => {
  Todo.findById(req.params.id, 'status description', function (err, todo) {
    if (err) {
      res.status(500).send(err);
    }

    todo.status = req.body.status;
    todo.description = req.body.description;
    todo.save(function (err, todo) {
      if (err) {
        res.status(500).send(err);
      }
      res.send({
        success: true,
        todo: todo
      });
    });
  });
});

app.delete('/todos/:id', (req, res) => {
  Todo.remove({
    _id: req.params.id
  }, function (err, todo) {
    if (err) {
      res.status(500).send(err);
    }
    res.send({
      success: true,
      todo: todo
    });
  });
});

const port = process.env.PORT || 8081;
app.listen(port, function () {
  console.log('Server started on port ' + port);
});

module.exports = app;
