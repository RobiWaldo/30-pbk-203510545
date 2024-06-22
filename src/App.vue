<!-- src/App.vue -->
<template>
  <div class="background">
    <img src="./assets/wind.jpg" />
  </div>
  <q-toolbar class="q-pa-md">
    <q-btn flat label="Todos" :to="{ path: '/todos' }" />
    <q-btn flat label="Posts" :to="{ path: '/posts' }" />
    <q-btn flat label="Albums" :to="{ path: '/albums' }" />
  </q-toolbar>
  <div class="container mt-5">
    <router-view />
  </div>
</template>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jersey+15&display=swap');



.background img {
  position: fixed;
  top: 0;
  left: 0;
  min-height: 90%;
  min-width: 1000px;
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

.q-toolbar {
  display: inline;
  position: fixed;
  top: 0%;
  width: 100%;
  left: 5%;
  color: white;
  z-index: -1;
}
</style>
