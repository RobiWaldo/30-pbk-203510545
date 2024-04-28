<template>
  <div class="background">
    <img src="https://i.ibb.co/fdy5Kgj/wind-breaker-anime-characters-2k-wallpaper-uhdpaper-com-388-3-a.jpg"/>
  </div>
  <div class="container mt-5">
    <h1>Daftar Kegiatan</h1>
    <button @click="toggleFilter" class="btn btn-primary mb-3">{{ filterButtonLabel }}</button>
    <table class="table">
      <thead>
        <tr>
          <th>Status</th>
          <th>Nama Kegiatan</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(todo, index) in filteredTodos" :key="index">
          <td>
            <input type="checkbox" v-model="todo.completed" @click="updateStatus(todo)">
            {{ todo.completed ? 'Selesai' : 'Belum Selesai' }}
          </td>
          <td>{{ todo.name }}</td>
          <td><button @click="deleteTodo(index)" class="btn btn-danger">Delete</button></td>
        </tr>
      </tbody>
    </table>
    <div class="mb-3">
      <input type="text" v-model="newTodo" class="form-control d-inline" placeholder="Tambahkan kegiatan...">
      <button @click="addTodo" class="btn btn-success">Tambah</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const todos = ref([
  { name: 'Mengerjakan Tugas', completed: false },
  { name: 'Nonton Timnas', completed: false },
  { name: 'Olahraga', completed: true }
]);
const newTodo = ref('');
const showIncomplete = ref(false);

const addTodo = () => {
  if (newTodo.value.trim() !== '') {
    todos.value.push({ name: newTodo.value, completed: false });
    newTodo.value = '';
  }
};

const deleteTodo = (index) => {
  todos.value.splice(index, 1);
};

const updateStatus = (todo) => {
  todo.completed = !todo.completed;
};

const toggleFilter = () => {
  showIncomplete.value = !showIncomplete.value;
};

const filteredTodos = computed(() => {
  if (showIncomplete.value) {
    return todos.value.filter(todo => !todo.completed);
  } else {
    return todos.value;
  }
});

const filterButtonLabel = computed(() => {
  return showIncomplete.value ? 'Return to Default' : 'Show Incomplete';
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jersey+15&display=swap');
.container{
  margin-left: -130%;
  filter: drop-shadow(0 0 10px #008000);
}
h1{
  font-family: "Jersey 15", sans-serif;
  color: greenyellow;
  text-shadow: 0 0 10px #008000;
}

table{
  border: 1px solid black;
  max-width: 100%;
  max-height: 100%;
}
tr th{
  background-color: gray;
  font-weight: bolder;
}
tr td{
  color: wheat;
  background-color: transparent;
  backdrop-filter: blur(5px);
}

.mb-3{
  display: flex;
}
.btn-success{
  margin-left: 10px;
}
.background img{
  position: fixed;
  top: 0;
  left: 0;
  min-height: 90%;
  min-width: 1500px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -2;
  object-fit: cover;
  -webkit-background-size:cover; -moz-background-size:cover; -o-background-size:cover; background-size: cover;
  filter: brightness(0.8);
}
</style>