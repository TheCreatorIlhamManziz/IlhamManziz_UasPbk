<template>
  <div class="card">
    <!-- Link hanya di bagian gambar -->
    <RouterLink :to="`/dashboard/senjata/${senjata.id}`" class="img-wrap">
      <img :src="senjata.gambar" :alt="senjata.nama" />
      <span v-if="senjata.diskonPercent === 25" class="badge">🔥 25%</span>
    </RouterLink>

    <h3 class="nama">{{ senjata.nama }}</h3>

    <p class="price">
      <span v-if="senjata.diskonPercent === 25" class="old">
        Rp {{ senjata.harga.toLocaleString('id-ID') }}
      </span>
      Rp {{ finalPrice.toLocaleString('id-ID') }}
    </p>

    <button @click="add">🛒 Tambah</button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '../stores/cart'
import { RouterLink } from 'vue-router'

const props = defineProps({ senjata: Object })
const cart = useCartStore()

const finalPrice = computed(() =>
  props.senjata.diskonPercent === 25
    ? Math.round(props.senjata.harga * 0.75)
    : props.senjata.harga
)

function add () {
  cart.addToCart(props.senjata)
  alert(`${props.senjata.nama} ditambahkan ke keranjang!`)
}
</script>

<style scoped>
.card-link {
  text-decoration: none;
  display: block;
  width: 200px;
}

.card {
  background: #111;
  border: 2px solid #0f0;
  border-radius: 12px;
  padding: 16px;
  color: #0f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 340px;
  box-sizing: border-box;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 12px #0f0;
}

.img-wrap {
  position: relative;
  width: 100%;
  height: 140px;
  overflow: hidden;
  border-radius: 8px;
}

.img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 8px;
}

.badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: red;
  color: #fff;
  font-size: 12px;
  padding: 3px 6px;
  border-radius: 4px;
  font-weight: bold;
}

.nama {
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
  min-height: 2.2em; /* menjaga tinggi teks seragam */
}

.price {
  font-weight: 600;
  margin: 8px 0;
  text-align: center;
}

.price .old {
  text-decoration: line-through;
  margin-right: 6px;
  opacity: 0.6;
  font-weight: 400;
  font-size: 14px;
}

button {
  margin-top: auto;
  background: none;
  border: 2px solid #0f0;
  color: #0f0;
  padding: 6px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s ease, color 0.3s ease;
}

button:hover {
  background: #0f0;
  color: #000;
}
</style>
