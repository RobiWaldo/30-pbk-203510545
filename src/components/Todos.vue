<!-- src/components/Todos.vue -->
<template>
  <div class="container mt-5">
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
</template>

<script setup>
import { ref, computed } from 'vue';
import Swal from 'sweetalert2';
import { useTodoStore } from '../stores/todoStore';
import { storeToRefs } from 'pinia';

const todoStore = useTodoStore();
const { todos } = storeToRefs(todoStore);

const newTodo = ref('');
const showIncomplete = ref(false);

const addTodo = () => {
  todoStore.addTodo(newTodo.value);
  newTodo.value = '';
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
      todoStore.deleteTodo(index);
      Swal.fire('Terhapus!', 'Kegiatan telah dihapus.', 'success');
    }
  });
};

const updateStatus = (todo) => {
  todoStore.updateStatus(todo);
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
      todoStore.editTodo(index, newName, newStatus);
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
</script>

<style scoped>
.container, .mt-5 {
  margin-left: 0%;
  width: 50%;
  filter: drop-shadow(0 0 10px #008000);
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
</style>
