<template>
    <div class="katalog-container">
      <h1>📦 Katalog Senjata</h1>
      <div class="senjata-grid">
        <SenjataCard
          v-for="senjata in senjataList"
          :key="senjata.id"
          :senjata="senjata"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import SenjataCard from '../components/SenjataCard.vue'
  
  const senjataList = [
    {
      id: 1,
      nama: 'AK-47',
      harga: 3000000,
      gambar: 'https://upload.wikimedia.org/wikipedia/commons/1/16/AK-47_type_II_Part_DM-ST-89-01131.jpg',
      diskon: true
    },
    {
      id: 2,
      nama: 'M4A1',
      harga: 4200000,
      gambar: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/M4_Carbine_with_M68_CCO.png',
      diskon: false
    }
  ]
  </script>
  
  <style scoped>
  .katalog-container {
    color: #0f0;
    padding: 30px;
    text-align: center;
  }
  .senjata-grid {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 25px;
    margin-top: 20px;
  }
  </style>
  