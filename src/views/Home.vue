<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero">
      <h1>Aplikasi Toko Senjata</h1>
      <p>🔥 Diskon 20% Senjata Premium Hari Ini!</p>
    </section>

    <!-- Daftar Senjata Terbaru -->
    <section class="senjata-section">
      <h2>Senjata Terbaru</h2>
      <div class="senjata-grid">
        <SenjataCard
          v-for="item in senjataList"
          :key="item.id"
          :senjata="item"
        />
      </div>
    </section>

    <!-- Tombol ke Katalog -->
    <div class="lihat-semua">
      <RouterLink to="/dashboard/katalog" class="btn-lihat">
        Lihat Semua Senjata →
      </RouterLink>
    </div>

    <!-- Tentang Kami -->
    <section class="tentang">
      <h3>Tentang Kami</h3>
      <p>
        Toko Senjata Digital terbaik yang menyediakan berbagai jenis senjata
        untuk kebutuhan simulasi, game, dan koleksi. Kami tidak menjual senjata
        sungguhan.
      </p>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../firebase'
import SenjataCard from '../components/SenjataCard.vue'

const senjataList = ref([])

const fetchSenjata = async () => {
  const q = query(
    collection(db, 'senjata'),
    orderBy('created_at', 'desc'),
    limit(6)
  )
  const snapshot = await getDocs(q)
  senjataList.value = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }))
}

onMounted(() => {
  fetchSenjata()
})
</script>
  
  <style scoped>
  .home-page {
    color: #0f0;
    font-family: 'Courier New', monospace;
    padding: 20px;
  }
  
  .hero {
    text-align: center;
    margin-bottom: 30px;
  }
  
  .hero h1 {
    font-size: 36px;
    text-shadow: 0 0 10px #0f0;
  }
  
  .hero p {
    font-size: 18px;
    margin-top: 10px;
  }
  
  .senjata-section {
    margin: 40px 0;
    text-align: center;
  }
  
  .senjata-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
  }
  
  .btn-lihat {
    border: 2px solid #0f0;
    padding: 10px 20px;
    border-radius: 8px;
    color: #0f0;
    text-decoration: none;
    font-weight: bold;
    transition: background 0.3s ease;
  }
  
  .btn-lihat:hover {
    background-color: #0f0;
    color: #000;
  }
  
  .tentang {
    text-align: center;
    max-width: 600px;
    margin: 50px auto;
  }
  </style>
  