<template>
<div class="todos">
  <h1>MEVN Todo List</h1>
  <div v-if="todos.length > 0" class="table-wrap">
    <div>
      <router-link v-bind:to="{ name: 'addTodo' }" class="appTodoBtn">Add Todo</router-link>
    </div>
    <br>
    <table>
      <tr>
        <td width="100">Status</td>
        <td width="550">Description</td>
        <td width="100">Actions</td>
      </tr>
      <tr v-for="todo in todos">
        <td>
          <input type="checkbox" v-model="todo.status" @click="updateTodoStatus(todo._id,todo.status,todo.description)">
        </td>
        <td>
          <textarea v-model="todo.description"></textarea>
        </td>
        <td>
          <a href="#" @click="updateTodo(todo._id,todo.status,todo.description)" class="appTodoBtn">Update</a>
          <div class="spacer"></div>
          <a href="#" @click="deleteTodo(todo._id)" class="appTodoBtn">Delete</a>
        </td>
      </tr>
    </table>
  </div>
  <div v-else>
    There are no todos. Create a new one below! <br /><br />
    <router-link v-bind:to="{ name: 'addTodo' }" class="appTodoBtn">Add Todo</router-link>
  </div>
</div>
</template>

<script>
import TodosService from '@/services/TodosService'
export default {
  name: 'todos',
  data() {
    return {
      todos: []
    }
  },
  mounted() {
    this.getTodos();
  },
  methods: {
    async getTodos() {
      const response = await TodosService.fetchTodos()
      this.todos = response.data.todos
    },
    async updateTodo(id, status, description) {
      await TodosService.updateTodo({
        id: id,
        status: status,
        description: description
      });
    },
    async updateTodoStatus(id, status, description) {
      status = !status;
      await TodosService.updateTodo({
        id: id,
        status: status,
        description: description
      });
    },
    async deleteTodo(id) {
      await TodosService.deleteTodo(id)
      this.getTodos();
    }
  }
}
</script>
<style type="text/css">
.table-wrap {
  width: 80%;
  margin: 0 auto;
  text-align: center;
}

table {
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
}

textarea {
  width: 100%;
  text-align: center;
}

table th,
table tr {
  text-align: center;
}

table thead {
  background: #f2f2f2;
}

table tr td {
  padding: 10px;
}

table tr:nth-child(odd) {
  background: #f2f2f2;
}

table tr:nth-child(1) {
  background: #90b9f9;
  color: #fff;
}

a {
  color: #4d7ef7;
  text-decoration: none;
}

.appTodoBtn {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 520px;
  border: none;
  cursor: pointer;
}

div.spacer {
  font-size: 0;
  height: 20px;
  line-height: 0;
}
</style>
