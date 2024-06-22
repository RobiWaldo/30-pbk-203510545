// src/stores/todoStore.js
import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [
      { name: 'Mengerjakan Tugas', completed: false },
      { name: 'Nonton Timnas', completed: false },
      { name: 'Olahraga', completed: true }
    ]
  }),
  actions: {
    addTodo(newTodo) {
      if (newTodo.trim() !== '') {
        this.todos.push({ name: newTodo, completed: false });
      }
    },
    deleteTodo(index) {
      this.todos.splice(index, 1);
    },
    updateStatus(todo) {
      todo.completed = !todo.completed;
    },
    editTodo(index, newName, newStatus) {
      this.todos[index].name = newName;
      this.todos[index].completed = newStatus;
    }
  }
});
