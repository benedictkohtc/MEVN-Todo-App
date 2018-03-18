<template>
<div class="todos">
  <h1>Add Todo</h1>
  <div class="form">
    <div>
      <textarea rows="15" cols="15" placeholder="Describe your task here" v-model="description"></textarea>
    </div>
    <div>
      <button class="appTodoBtn" @click="addTodo">Add Todo</button>
    </div>
    <div>
      <button class="appTodoBtn" @click="back">Back</button>
    </div>
  </div>
</div>
</template>

<script>
import TodosService from '@/services/TodosService';
export default {
  name: 'addTodo',
  data() {
    return {
      status: false,
      description: ''
    };
  },
  methods: {
    async addTodo() {
      console.log('addTodo called');
      await TodosService.addTodo({
        status: this.status,
        description: this.description
      });
      this.$router.push({
        name: 'Todos'
      });
    },
    back() {
      this.$router.push({
        name: 'Todos'
      });
    }
  }
};
</script>
<style type="text/css">
.form input,
.form textarea {
  width: 500px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
}

.form div {
  margin: 20px;
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
</style>
