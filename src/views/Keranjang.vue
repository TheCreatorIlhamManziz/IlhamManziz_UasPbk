<template>
  <div class="keranjang">
    <h2>🛒 Keranjang Belanja</h2>
    <div v-if="cart.items.length === 0">Keranjang kosong.</div>
    <div v-else>
      <ul class="daftar-item">
        <li v-for="item in cart.items" :key="item.id">
          {{ item.nama }} x {{ item.jumlah }} =
          Rp {{ (item.harga * item.jumlah).toLocaleString('id-ID') }}
          <button @click="hapus(item.id)">❌</button>
        </li>
      </ul>
      <h3>Total: Rp {{ totalHarga.toLocaleString('id-ID') }}</h3>
      <button class="pesan" @click="pesan">📦 Pesan (Bayar COD)</button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useCartStore } from '../stores/cart'
import { useOrderStore } from '../stores/order'
import { getAuth } from 'firebase/auth'

const cart = useCartStore()
const orderStore = useOrderStore()

onMounted(() => {
  cart.loadCart()
})

const totalHarga = computed(() =>
  cart.items.reduce((sum, item) => sum + item.harga * item.jumlah, 0)
)

function hapus(id) {
  cart.removeFromCart(id)
}

async function pesan() {
  const auth = getAuth()
  const user = auth.currentUser
  if (!user) return alert('❌ Harus login dulu!')

  if (cart.items.length === 0) return alert('❌ Keranjang kosong!')

  const profil = JSON.parse(localStorage.getItem('profil') || '{}')

  const order = {
    items: [...cart.items],
    total: totalHarga.value,
    lokasi: profil.lokasi || 'Tidak diketahui',
    email: user.email,
  }

  await orderStore.addOrder(order)
  await cart.clearCart()
  alert('✅ Pesanan berhasil dikirim!')
}
</script>

<style scoped>
.keranjang {
  padding: 24px;
  color: #0f0;
  font-family: "Courier New", monospace;
}
ul.daftar-item {
  list-style: none;
  padding: 0;
}
.daftar-item li {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px dashed #0f0;
  margin-bottom: 8px;
}
button {
  border: 1px solid #0f0;
  background: none;
  color: #0f0;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
}
button:hover {
  background: #0f0;
  color: black;
}
.pesan {
  margin-top: 20px;
  width: 100%;
}
</style>
