<!-- App.vue -->
<template>
  <div class="app-container">
    <!-- HANYA tampilkan header jika BUKAN di /dashboard -->
    <div v-if="!isDashboard">
      <h1>Aplikasi Toko Senjata</h1>
      <div v-if="user">
        <p>Selamat datang, {{ user.email }}</p>
        <RouterLink class="link" to="/dashboard">Dashboard</RouterLink>
      </div>
      <div v-else>
        <p>Silakan login atau register terlebih dahulu.</p>
      </div>
    </div>

    <router-view />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useUserStore } from './stores/user'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const route = useRoute()
const store = useUserStore()
store.loadUser()
const { user } = storeToRefs(store)

// REAKTIF terhadap perubahan path
const isDashboard = computed(() => route.path.startsWith('/dashboard'))
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  background-color: #000;
  color: #0f0;
  font-family: 'Courier New', monospace;
  text-align: center;
  padding-top: 30px;
}

h1 {
  font-size: 2em;
  text-shadow: 0 0 10px #0f0;
  margin-bottom: 10px;
}

p {
  margin-bottom: 10px;
}

.link {
  color: #0f0;
  text-decoration: underline;
  font-weight: bold;
}

.link:hover {
  color: #9f0;
}
</style>

<!-- Global Reset CSS -->
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html, body {
  background-color: #000;
  color: #0f0;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  font-family: 'Courier New', monospace;
}
</style>
