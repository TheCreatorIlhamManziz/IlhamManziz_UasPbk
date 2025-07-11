<template>
  <div class="riwayat">
    <h2>📜 Riwayat Pesanan</h2>

    <div v-if="orders.length === 0">Belum ada pesanan.</div>

    <div v-for="order in orders" :key="order.id" class="pesanan">
      <ul>
        <li v-for="item in order.items" :key="item.id">
          {{ item.nama }} x {{ item.jumlah }}
        </li>
      </ul>
      <p><strong>Total:</strong> Rp {{ order.total.toLocaleString('id-ID') }}</p>
      <p><strong>Status:</strong> {{ order.status }}</p>
      <p><strong>Lokasi:</strong> {{ order.lokasi }}</p>
      <p><strong>Waktu:</strong> {{ order.waktu }}</p>
      <button v-if="order.status !== 'Dibatalkan'" @click="batalkan(order.id)">❌ Batalkan</button>
    </div>
  </div>
</template>

<script setup>
import { useOrderStore } from '../stores/order'
import { onMounted, computed } from 'vue'

const orderStore = useOrderStore()

onMounted(() => {
  orderStore.fetchOrders()
})

function batalkan(id) {
  orderStore.cancelOrder(id)
}

const orders = computed(() => orderStore.orders)
</script>

<style scoped>
.riwayat {
  color: #0f0;
  padding: 24px;
  font-family: 'Courier New', monospace;
}
.pesanan {
  border: 1px solid #0f0;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
  background: #000;
}
.pesanan p {
  margin: 4px 0;
}
button {
  margin-top: 10px;
  border: 1px solid #0f0;
  background: transparent;
  color: #0f0;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
}
button:hover {
  background: #0f0;
  color: #000;
}
</style>
