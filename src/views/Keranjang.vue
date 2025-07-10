<script setup>
import { useCartStore } from '../stores/cart'
const cartStore = useCartStore()

const totalHarga = computed(() =>
  cartStore.items.reduce((total, item) => total + item.harga * item.jumlah, 0)
)
</script>

<template>
  <div class="keranjang">
    <h2>🛒 Keranjang Belanja</h2>
    <div v-if="cartStore.items.length === 0">Keranjang kosong.</div>
    <ul v-else>
      <li v-for="item in cartStore.items" :key="item.id">
        {{ item.nama }} x {{ item.jumlah }} = Rp {{ (item.harga * item.jumlah).toLocaleString() }}
      </li>
    </ul>
    <div v-if="cartStore.items.length > 0">
      <h3>Total: Rp {{ totalHarga.toLocaleString() }}</h3>
      <button @click="alert('Lanjut ke pembayaran!')">💳 Bayar</button>
    </div>
  </div>
</template>

<style scoped>
.keranjang {
  padding: 30px;
  color: #0f0;
  font-family: 'Courier New', monospace;
}
</style>
