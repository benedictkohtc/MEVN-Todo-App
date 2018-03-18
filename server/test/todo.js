/* global describe it beforeEach */

process.env.NODE_ENV = 'test';

const Todo = require('../models/todo');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/app');

const assert = chai.assert;
chai.use(chaiHttp);

describe('Todos', () => {
  beforeEach((done) => {
    Todo.remove({}, (err) => {
      if (err) {
        // console.error(err);
      }
      done();
    });
  });

  describe('/GET todos', () => {
    it('should GET all the todos', (done) => {
      chai.request(server)
        .get('/todos')
        .end((err, res) => {
          if (err) {
            // console.error(err);
          }
          assert.equal(res.status, 200);
          assert.isArray(res.body.todos);
          assert.equal(res.body.todos.length, 0);
          done();
        });
    });
  });

  describe('/GET/:id todos', () => {
    it('should GET a todo by the given id', (done) => {
      let testTodo = {
        status: false,
        description: 'new todo'
      };
      let todo = new Todo(testTodo);
      todo.save((err, todo) => {
        if (err) {
          // console.error(err);
        }
        chai.request(server)
              .get('/todos/' + todo.id)
              .send(testTodo)
              .end((err, res) => {
                if (err) {
                  // console.error(err);
                }
                assert.equal(res.status, 200);
                assert.isObject(res.body);
                assert.equal(res.body.success, true);
                assert.equal(res.body.todo.status, false);
                assert.equal(res.body.todo.description, 'new todo');
                done();
              });
      });
    });
    it('should handle errors', (done) => {
      chai.request(server)
        .get('/todos/999999')
        .end((err, res) => {
          if (err) {
            // console.error(err);
          }
          assert.equal(res.status, 500);
          done();
        });
    });
  });

  describe('/POST todos', () => {
    it('should POST a todo', (done) => {
      let testTodo = {
        status: false,
        description: 'test todo'
      };
      chai.request(server)
       .post('/todos')
       .send(testTodo)
       .end((err, res) => {
         if (err) {
           // console.error(err);
         }
         assert.equal(res.status, 200);
         assert.isObject(res.body);
         assert.equal(res.body.success, true);
         assert.equal(res.body.todo.status, false);
         assert.equal(res.body.todo.description, 'test todo');
         done();
       });
    });
  });

  describe('/PUT/:id todos', () => {
    it('should UPDATE a todo by the given id', (done) => {
      let testTodo = {
        status: false,
        description: 'test todo'
      };
      let updatedTestTodo = {
        status: true,
        description: 'updated todo'
      };
      let todo = new Todo(testTodo);
      todo.save((err, todo) => {
        if (err) {
          // console.error(err);
        }
        chai.request(server)
              .put('/todos/' + todo.id)
              .send(updatedTestTodo)
              .end((err, res) => {
                if (err) {
                  // console.error(err);
                }
                assert.equal(res.status, 200);
                assert.isObject(res.body);
                assert.equal(res.body.success, true);
                assert.equal(res.body.todo.status, true);
                assert.equal(res.body.todo.description, 'updated todo');
                done();
              });
      });
    });
    it('should handle errors', (done) => {
      chai.request(server)
        .put('/todos/999999')
        .send()
        .end((err, res) => {
          if (err) {
            // console.error(err);
          }
          assert.equal(res.status, 500);
          done();
        });
    });
  });

  describe('/DELETE/:id todos', () => {
    it('should DELETE a todo by the given id', (done) => {
      let testTodo = {
        status: false,
        description: 'deleted todo'
      };
      let todo = new Todo(testTodo);
      todo.save((err, todo) => {
        if (err) {
          // console.error(err);
        }
        chai.request(server)
              .delete('/todos/' + todo.id)
              .end((err, res) => {
                if (err) {
                  // console.error(err);
                }
                assert.equal(res.status, 200);
                assert.isObject(res.body);
                assert.equal(res.body.success, true);
                assert.equal(res.body.todo.n, 1);
                assert.equal(res.body.todo.ok, 1);
                done();
              });
      });
    });
    it('should handle errors', (done) => {
      chai.request(server)
        .delete('/todos/999999')
        .end((err, res) => {
          if (err) {
            // console.error(err);
          }
          assert.equal(res.status, 500);
          done();
        });
    });
  });
});
