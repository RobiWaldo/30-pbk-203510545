<!-- src/components/Album.vue -->
<template>
    <div class="album">
      <h1>Album</h1>
      <div class="gallery">
        <div v-for="photo in photos" :key="photo.id" class="thumbnail" @click="viewPhoto(photo.id)">
          <img :src="photo.thumbnailUrl" alt="photo.title">
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  const photos = ref([]);
  const router = useRouter();
  
  const fetchPhotos = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/photos?');
      photos.value = response.data.slice(0, 21); // Limit to 100 photos for performance
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };
  
  const viewPhoto = (id) => {
    router.push(`/albums/${id}`);
  };
  
  onMounted(fetchPhotos);
  </script>
  
  <style scoped>
  .album {
    text-align: center;
    color: green;
    text-shadow: 0 0 0 10px white;
  }
  
  .gallery {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .thumbnail {
    margin: 10px;
  }
  
  .thumbnail img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    cursor: pointer;
  }
  </style>
  