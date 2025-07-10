<template>
  <div class="profil">
    <h2>👤 Profil Pengguna</h2>
    <div class="container">
      <!-- FOTO PROFIL -->
      <div class="foto-wrap" @click="unggahFoto">
        <img v-if="profil.foto" :src="profil.foto" alt="Foto Profil" />
        <span v-else>Foto Profil</span>
      </div>
      <input type="file" ref="fileInput" hidden @change="onFotoDipilih" accept="image/*" />

      <!-- FORM PROFIL -->
      <input v-model="profil.nama" placeholder="Nama" />
      <input v-model="profil.email" placeholder="Email" disabled />
      <textarea v-model="profil.deskripsi" placeholder="Deskripsi Diri"></textarea>
      <input v-model="profil.lokasi" placeholder="Lokasi (cth: Jakarta)" />

      <!-- GOOGLE MAPS -->
      <iframe
        v-if="profil.lokasi"
        :src="`https://www.google.com/maps?q=${encodeURIComponent(profil.lokasi)}&output=embed`"
        class="maps"
        allowfullscreen
      ></iframe>

      <button @click="simpan">💾 Simpan</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const fileInput = ref(null)
const profil = ref({
  nama: '',
  email: '',
  deskripsi: '',
  lokasi: '',
  foto: ''
})

// Cek Auth dan load localStorage
onMounted(() => {
  const auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      profil.value.email = user.email
      const saved = localStorage.getItem('profil')
      if (saved) {
        const parsed = JSON.parse(saved)
        profil.value = { ...parsed, email: user.email }
      }
    }
  })
})

function simpan() {
  localStorage.setItem('profil', JSON.stringify(profil.value))
  alert('✅ Profil berhasil disimpan!')
}

function unggahFoto() {
  fileInput.value.click()
}

function onFotoDipilih(e) {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      profil.value.foto = reader.result
    }
    reader.readAsDataURL(file)
  }
}
</script>

<style scoped>
.profil {
  padding: 30px;
  font-family: 'Courier New', monospace;
  color: #0f0;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  font-weight: bold;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.foto-wrap {
  width: 140px;
  height: 140px;
  border: 2px solid #0f0;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #0f0;
  cursor: pointer;
  overflow: hidden;
  transition: 0.3s ease;
}

.foto-wrap:hover {
  box-shadow: 0 0 12px #0f0;
}

.foto-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

input,
textarea {
  width: 100%;
  max-width: 500px;
  background: black;
  border: 1px solid #0f0;
  color: #0f0;
  padding: 10px;
  border-radius: 6px;
  font-family: 'Courier New', monospace;
}

textarea {
  min-height: 60px;
  resize: vertical;
}

.maps {
  width: 100%;
  max-width: 500px;
  height: 200px;
  border: 2px solid #0f0;
  border-radius: 8px;
}

button {
  background: black;
  border: 2px solid #0f0;
  color: #0f0;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
}

button:hover {
  background: #0f0;
  color: black;
}
</style>
