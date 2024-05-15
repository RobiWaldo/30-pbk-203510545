<template>
  <div class="background"></div>

  <nav class="navbar navbar-expand-lg navbar-light ">
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" :class="{ active: currentView === 'todos' }">
          <a class="nav-link" @click="currentView = 'todos'" style="text-decoration: none;">Todos</a>
        </li>
        <li class="nav-item" :class="{ active: currentView === 'post' }">
          <a class="nav-link" @click="currentView = 'post'" style="text-decoration: none;">Post</a>
        </li>
      </ul>
    </div>
  </nav>

  <div class="container mt-5">
    <div v-if="currentView === 'todos'">
      <h1>Daftar Kegiatan</h1>
      <button @click="toggleFilter" class="btn btn-primary mb-3">{{ filterButtonLabel }}</button>
      <table class="table">
        <thead>
          <tr>
            <th>Status</th>
            <th>Nama Kegiatan</th>
            <th>Action</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(todo, index) in filteredTodos" :key="index">
            <td>
              <input type="checkbox" v-model="todo.completed" @click="updateStatus(todo)">
              {{ todo.completed ? 'Selesai' : 'Belum Selesai' }}
            </td>
            <td>{{ todo.name }}</td>
            <td><button @click="confirmDelete(index)" class="btn btn-danger">Delete</button></td>
            <td><button @click="editTodo(index)" class="btn btn-warning">Edit</button></td>
          </tr>
        </tbody>
      </table>
      <div class="mb-3">
        <input type="text" v-model="newTodo" class="form-control d-inline" placeholder="Tambahkan kegiatan...">
        <button @click="addTodo" class="btn btn-success">Tambah</button>
      </div>
    </div>
  </div>

  <div v-if="currentView === 'post'" class="card">
    <div class="card-body">
      <h1>Data Post</h1>
      <select @change="fetchData" class="form-select">
        <option value="" selected>Pilih username</option>
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.username }}</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import Swal from 'sweetalert2';
import axios from 'axios';

const todos = ref([
  { name: 'Mengerjakan Tugas', completed: false },
  { name: 'Nonton Timnas', completed: false },
  { name: 'Olahraga', completed: true }
]);
const newTodo = ref('');
const showIncomplete = ref(false);
const currentView = ref('todos');
const users = ref([]);

const addTodo = () => {
  if (newTodo.value.trim() !== '') {
    todos.value.push({ name: newTodo.value, completed: false });
    newTodo.value = '';
  }
};

const deleteTodo = (index) => {
  todos.value.splice(index, 1);
};

const confirmDelete = (index) => {
  Swal.fire({
    title: 'Apakah Anda yakin?',
    text: "Anda tidak akan dapat mengembalikan tindakan ini!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, hapus!'
  }).then((result) => {
    if (result.isConfirmed) {
      deleteTodo(index);
      Swal.fire('Terhapus!', 'Kegiatan telah dihapus.', 'success');
    }
  });
};

const updateStatus = (todo) => {
  todo.completed = !todo.completed;
};

const editTodo = (index) => {
  Swal.fire({
    title: 'Edit Kegiatan',
    html:
      '<input id="swal-input1" class="swal2-input" value="' + todos.value[index].name + '">' +
      '<select id="swal-select1" class="swal2-select">' +
        '<option value="true">Selesai</option>' +
        '<option value="false" selected>Belum Selesai</option>' +
      '</select>',
    showCancelButton: true,
    confirmButtonText: 'Simpan',
    cancelButtonText: 'Batal',
    preConfirm: () => {
      const newName = Swal.getPopup().querySelector('#swal-input1').value;
      const newStatus = Swal.getPopup().querySelector('#swal-select1').value === 'true';
      todos.value[index].name = newName;
      todos.value[index].completed = newStatus;
    }
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('Edit berhasil!', 'Kegiatan telah diubah.', 'success');
    }
  });
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

const fetchData = async (event) => {
  const userId = event.target.value;
  const response = await axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${userId}`);
  Swal.fire({
    title: 'Data Post',
    html: response.data.map(photo => `<p>${photo.title}</p>`).join(''),
    icon: 'info'
  });
};

const fetchUsers = async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  users.value = response.data;
};

onMounted(fetchUsers);
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jersey+15&display=swap');

.container {
  margin-left: -50%;
  filter: drop-shadow(0 0 10px #008000);
}

.navbar {
  position: fixed;
  top: 10%;
  left: 44%;
  transform: translateX(-50%);
  width: 100%;
  padding: 10px;
  padding-left: 10px;
  z-index: 1;
}

.navbar-nav {
  justify-content: center;
  width: 100%;
}

.nav-item {
  z-index: 1111;
  position: grid;
  top: 10%;
  left: 10%;
  background-color: green;
  margin: 0 15px;
  margin-left: 10%;
}

.nav-item .nav-link {
  color: white;
  cursor: pointer;
}

.nav-item.active .nav-link {
  font-weight: bold;
  text-decoration: underline;
}
.nav-link{
  color: white;
}

h1 {
  font-family: "Jersey 15", sans-serif;
  color: greenyellow;
  text-shadow: 0 0 10px #008000;
}

table {
  border: 1px solid black;
  max-width: 100%;
  max-height: 100%;
}

tr th {
  background-color: gray;
  font-weight: bolder;
}

tr td {
  color: wheat;
  background-color: transparent;
  backdrop-filter: blur(5px);
}

.mb-3 {
  display: flex;
}

.btn-success {
  margin-left: 10px;
}

.background {
  background-image: url('./assets/wind.jpg');
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
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  filter: brightness(0.8);
}

.card {
  background-color: transparent;
  backdrop-filter: blur(5px);
  padding: 20px;
  margin-top: 20px;
  position: fixed;
  top: 30%;
  left: 40%;
}
.card-body{
  backdrop-filter: blur(5px);
  border: 1px solid white;
}

</style>
