<template>
    <div class="card">
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
  import { ref, onMounted } from 'vue';
  import Swal from 'sweetalert2';
  import axios from 'axios';
  
  const users = ref([]);
  
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
  .card {
    background-color: rgba(255, 255, 255, 0.8); /* Ubah ke warna latar belakang rgba */
    backdrop-filter: blur(5px);
    padding: 20px;
    margin-top: 20px;
    position: fixed;
    display: flex;
    left: -100%;
    margin-top: -200px;
    margin-left: -130px;
    width: 300px; /* Tambahkan lebar */
    border-radius: 10px; /* Tambahkan border radius */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Tambahkan shadow */
  }
  
  .card-body {
    backdrop-filter: blur(5px);
    border: 1px solid white;
  }
  </style>
  