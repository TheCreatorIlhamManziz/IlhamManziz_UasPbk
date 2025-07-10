<template>
    <div class="dashboard-container">
      <!-- Tombol Toggle Sidebar Pakai Ikon Senjata -->
      <button class="toggle-btn" @click="toggleSidebar">
        {{ sidebarOpen ? '🗡️ Tutup' : '🗡️ Menu' }}
      </button>
  
      <!-- Sidebar -->
      <aside :class="['sidebar', { open: sidebarOpen }]">
        <ul>
          <li><RouterLink to="/dashboard/home">🏠 Beranda</RouterLink></li>
          <li><RouterLink to="/dashboard/katalog">📦 Katalog</RouterLink></li>
          <li><RouterLink to="/dashboard/keranjang">🛒 Keranjang</RouterLink></li>
          <li><RouterLink to="/dashboard/riwayat">📜 Riwayat</RouterLink></li>
          <li><RouterLink to="/dashboard/profil">👤 Profil</RouterLink></li>
        </ul>
        <button class="logout-link" @click="logout">🚪 Logout</button>
      </aside>
  
      <!-- Navigasi Horizontal -->
      <nav class="nav-horizontal">
        <ul>
          <li><RouterLink to="/dashboard/home">Beranda</RouterLink></li>
          <li><RouterLink to="/dashboard/katalog">Katalog</RouterLink></li>
          <li><RouterLink to="/dashboard/keranjang">Keranjang</RouterLink></li>
          <li><RouterLink to="/dashboard/riwayat">Riwayat</RouterLink></li>
          <li><RouterLink to="/dashboard/profil">Profil</RouterLink></li>
          <li><button class="logout-link" @click="logout">Logout</button></li>
        </ul>
      </nav>
  
      <!-- Konten -->
      <div :class="['content', { shifted: sidebarOpen }]">
        <RouterView />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useUserStore } from '../stores/user'
  import { useRouter } from 'vue-router'
  import { signOut } from 'firebase/auth'
  import { auth } from '../firebase'
  
  const userStore = useUserStore()
  const router = useRouter()
  
  const sidebarOpen = ref(false)
  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
  }
  
  const logout = async () => {
    await signOut(auth)
    userStore.logout()
    router.push('/login')
  }
  </script>
  
  <style scoped>
  .dashboard-container {
    min-height: 100vh;
    background-color: #000;
    color: #0f0;
    font-family: 'Courier New', monospace;
    position: relative;
  }
  
  /* Sidebar Geser */
  .sidebar {
    width: 220px;
    background-color: rgba(17, 17, 17, 0.9);
    border-right: 2px solid #0f0;
    padding: 30px 20px;
    position: fixed;
    top: 60px;
    left: 0;
    height: calc(100% - 60px);
    overflow-y: auto;
    z-index: 100;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .sidebar.open {
    transform: translateX(0);
  }
  .sidebar ul {
    list-style: none;
    padding: 0;
  }
  .sidebar li {
    margin: 20px 0;
  }
  .sidebar a,
  .logout-link {
    color: #0f0;
    text-decoration: none;
    font-weight: bold;
    padding: 10px 15px;
    border-radius: 8px;
    display: block;
    text-align: center;
    transition: background 0.3s ease, color 0.3s ease;
  }
  .sidebar a:hover,
  .logout-link:hover {
    background-color: #0f0;
    color: #000;
  }
  
  /* Toggle Button */
  .toggle-btn {
    position: fixed;
    top: 10px;
    left: 10px;
    background: none;
    border: 2px solid #0f0;
    color: #0f0;
    padding: 10px 15px;
    cursor: pointer;
    z-index: 110;
    font-size: 18px;
    border-radius: 8px;
    transition: background 0.3s ease, color 0.3s ease;
  }
  .toggle-btn:hover {
    background-color: #0f0;
    color: #000;
  }
  
  /* Horizontal Menu */
  .nav-horizontal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: #000;
    border-bottom: 1px solid #0f0;
    padding: 15px 0;
    z-index: 90;
  }
  .nav-horizontal ul {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 18px;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .nav-horizontal a,
  .nav-horizontal .logout-link {
    color: #0f0;
    text-decoration: none;
    padding: 8px 14px;
    border: 1px solid #0f0;
    border-radius: 6px;
    background: none;
    font-weight: bold;
    transition: background 0.3s ease, color 0.3s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    min-width: 80px;
  }
  .nav-horizontal a:hover,
  .nav-horizontal .logout-link:hover {
    background-color: #0f0;
    color: #000;
  }
  
  /* Konten */
  .content {
    padding: 100px 30px 30px 30px;
    text-align: center;
    transition: margin-left 0.3s ease;
  }
  
  /* Jika sidebar terbuka, geser konten ke kanan */
  .content.shifted {
    margin-left: 220px;
  }
  </style>
  