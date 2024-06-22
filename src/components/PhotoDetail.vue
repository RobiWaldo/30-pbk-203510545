<!-- src/components/PhotoDetail.vue -->
<template>
    <div class="photo-detail" v-if="photo">
      <img :src="photo.url" :alt="photo.title">
      <p>{{ photo.title }}</p>
      <q-btn
        label="Back to Album"
        @click="goBack"
        class="q-mt-md"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRoute, useRouter } from 'vue-router';
  import { QBtn } from 'quasar';
  
  const photo = ref(null);
  const route = useRoute();
  const router = useRouter();
  
  const fetchPhoto = async (id) => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/photos/${id}`);
      photo.value = response.data;
    } catch (error) {
      console.error('Error fetching photo:', error);
    }
  };
  
  const goBack = () => {
    router.push('/albums');
  };
  
  onMounted(() => {
    const id = route.params.id;
    fetchPhoto(id);
  });
  </script>
  
  <style scoped>
  .photo-detail {
    text-align: center;
    color: white;
  }
  
  .photo-detail img {
    width: 600px;
    height: 600px;
    object-fit: cover;
  }
  
  .photo-detail p {
    margin-top: 10px;
    font-size: 1.2em;
    color: white;
  }
  
  .q-btn {
    background-color: rgba(0, 128, 0, 0.8); /* Green background with opacity */
    color: white;
  }
  </style>
  