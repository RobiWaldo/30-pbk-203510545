<template>
  <div class="background">
    <img src="https://i.ibb.co.com/yRkPd0B/wind.jpg"/>
    </div>
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item" :class="{ active: currentView === 'Todos' }">
            <a class="nav-link" @click="changeView('Todos')" style="text-decoration: none;">Todos</a>
          </li>
          <li class="nav-item" :class="{ active: currentView === 'Post' }">
            <a class="nav-link" @click="changeView('Post')" style="text-decoration: none;">Post</a>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container mt-5">
      <div v-if="currentView === 'Todos'">
        <Tudos />
      </div>
      <div v-if="currentView === 'Post'" class="card">
        <Posts @fetchData="fetchData" />
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Tudos from './components/Todos.vue';
import Posts from './components/Post.vue';

const currentView = ref('Todos');

const changeView = (view) => {
  currentView.value = view;
};

const fetchData = (data) => {
  // Tangani data yang diterima dari komponen Post
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jersey+15&display=swap');

.container {
  margin-left: -50%;
  filter: drop-shadow(0 0 10px #008000);
}

.background img {
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
</style>
