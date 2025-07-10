<template>
  <div class="keranjang">
    <h2>🛒 Keranjang Belanja</h2>

    <div v-if="cart.items.length === 0">Keranjang kosong.</div>

    <div v-else>
      <ul class="daftar-item">
        <li v-for="item in cart.items" :key="item.id">
          {{ item.nama }} x {{ item.jumlah }} = Rp {{ (item.harga * item.jumlah).toLocaleString('id-ID') }}
          <button @click="hapus(item.id)">❌</button>
        </li>
      </ul>

      <h3>Total: Rp {{ totalHarga.toLocaleString('id-ID') }}</h3>

      <button class="pesan" @click="pesan">📦 Pesan (Bayar COD)</button>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart'
import { useOrderStore } from '../stores/order'
import { computed } from 'vue'

const cart = useCartStore()
const order = useOrderStore()

const totalHarga = computed(() =>
  cart.items.reduce((total, item) => total + item.harga * item.jumlah, 0)
)

function hapus(id) {
  cart.removeFromCart(id)
}

function pesan() {
  if (cart.items.length === 0) return

  const profil = JSON.parse(localStorage.getItem('profil') || '{}')

  order.addOrder({
    id: Date.now(),
    items: [...cart.items],
    total: totalHarga.value,
    lokasi: profil.lokasi || 'Tidak diketahui',
    status: 'Dalam Perjalanan',
    waktu: new Date().toLocaleString('id-ID')
  })

  cart.clearCart()
  alert('✅ Pesanan berhasil dikirim dan akan dicatat di Riwayat!')
}
</script>

<style scoped>
.keranjang {
  padding: 24px;
  color: #0f0;
  font-family: 'Courier New', monospace;
}
ul.daftar-item {
  list-style: none;
  padding: 0;
}
.daftar-item li {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed #0f0;
  padding-bottom: 6px;
}
button {
  background: none;
  border: 1px solid #0f0;
  color: #0f0;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}
button:hover {
  background: #0f0;
  color: #000;
}
.pesan {
  margin-top: 20px;
  width: 100%;
}
</style>
