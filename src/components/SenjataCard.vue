<script setup>
import { useCartStore } from '../stores/cart'
const cartStore = useCartStore()

const props = defineProps({
  senjata: Object
})

const tambahKeKeranjang = () => {
  cartStore.addToCart(props.senjata)
  alert('Berhasil ditambahkan ke keranjang!')
}
</script>

<template>
  <div class="senjata-card">
    <img :src="senjata.gambar" alt="senjata" class="gambar"/>
    <h3>{{ senjata.nama }}</h3>
    <p>Rp {{ senjata.harga.toLocaleString() }}</p>
    <div v-if="senjata.diskon" class="diskon">🔥 Diskon</div>
    <button @click="tambahKeKeranjang">🛒</button>
  </div>
</template>

<style scoped>
.senjata-card {
  border: 2px solid #0f0;
  padding: 16px;
  border-radius: 12px;
  background-color: #111;
  color: #0f0;
  text-align: center;
  width: 220px;
}
.gambar {
  width: 100%;
  border-radius: 10px;
}
.diskon {
  color: red;
  font-weight: bold;
}
</style>
