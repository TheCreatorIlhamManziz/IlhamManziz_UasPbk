<template>
    <div class="detail-container" v-if="item">
      
      <!-- tombol kembali -->
      <div class="top-bar">
        <RouterLink to="/dashboard/katalog" class="btn-kembali">
          ← Kembali ke Katalog
        </RouterLink>
      </div>
  
      <!-- gambar -->
      <div class="gambar-wrap">
        <img :src="item.gambar" :alt="item.nama" class="gambar" />
      </div>
  
      <!-- nama senjata -->
      <div class="nama-wrap">
        <h2 class="nama">{{ item.nama }}</h2>
      </div>
  
      <!-- tombol keranjang -->
      <button @click="addToCart" class="btn-cart">🛒 Tambah ke Keranjang</button>
  
      <!-- deskripsi -->
      <div class="info">
        <section>
          <h3>🔫 Jenis Senjata</h3>
          <p>{{ item.jenis }}</p>
        </section>
  
        <section>
          <h3>⚙️ Spesifikasi Kunci</h3>
          <ul>
            <li v-for="s in item.spesifikasi" :key="s">{{ s }}</li>
          </ul>
        </section>
  
        <section>
          <h3>📜 Sejarah / Keunikan</h3>
          <p>{{ item.sejarah }}</p>
        </section>
  
        <section>
          <h3>🎮 Kegunaan dalam Simulasi/Game</h3>
          <p>{{ item.kegunaan }}</p>
        </section>
      </div>
    </div>
  
    <div v-else class="not-found">Senjata tidak ditemukan.</div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { useCartStore } from '../stores/cart'
  import { senjataList } from '../data/senjata.js'
  
  const route = useRoute()
  const cart  = useCartStore()
  
  /* cari senjata berdasarkan param id */
  const item = computed(() =>
    senjataList.find(s => s.id === Number(route.params.id))
  )
  
  /* klik tombol keranjang */
  function addToCart () {
    if (item.value) {
      cart.addToCart(item.value)
      alert(`${item.value.nama} ditambahkan ke keranjang!`)
    }
  }
  </script>
  
  <style scoped>
  .detail-container {
    max-width: 880px;
    margin: 0 auto;
    padding: 40px 20px;
    color: #0f0;
    font-family: 'Courier New', monospace;
  }
  
  /* tombol kembali */
  .top-bar {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 12px;
  }
  .btn-kembali {
    color: #0f0;
    border: 2px solid #0f0;
    padding: 6px 16px;
    border-radius: 8px;
    text-decoration: none;
    transition: background .3s ease, color .3s ease;
  }
  .btn-kembali:hover { background:#0f0; color:#000; }
  
  /* gambar */
  .gambar-wrap { text-align: center; margin-bottom: 16px; }
  .gambar {
    width: 100%; max-height: 280px; object-fit: contain;
    border-radius: 10px; box-shadow: 0 0 12px #0f0;
  }
  
  /* judul */
  .nama-wrap { text-align: center; margin: 12px 0 8px; }
  .nama { font-size: 26px; font-weight: bold; text-shadow: 0 0 8px #0f0; }
  
  /* tombol keranjang */
  .btn-cart {
    display: block; margin: 0 auto 28px;
    background:none; border:2px solid #0f0;
    color:#0f0; padding:10px 20px; border-radius:10px;
    cursor:pointer; font-weight:bold;
    transition:background .3s ease, color .3s ease;
  }
  .btn-cart:hover { background:#0f0; color:#000; }
  
  /* konten kiri */
  .info { text-align:left; }
  
  section { margin-bottom:32px; }
  section h3 {
    font-size:18px; margin-bottom:10px;
    border-bottom:2px solid #0f0; display:inline-block; padding-bottom:4px;
  }
  section p { margin:6px 0; font-size:15px; }
  
  ul { padding-left:20px; list-style-type:square; }
  ul li { margin:6px 0; }
  
  /* not found */
  .not-found { color:red; text-align:center; padding:60px; }
  </style>
  