// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Todos from '../components/Todos.vue';
import Post from '../components/Post.vue';
import Album from '../components/Album.vue';
import PhotoDetail from '../components/PhotoDetail.vue';

const routes = [
  { path: '/', redirect: '/todos' },
  { path: '/todos', component: Todos },
  { path: '/posts', component: Post },
  { path: '/albums', component: Album },
  { path: '/albums/:id', component: PhotoDetail }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
