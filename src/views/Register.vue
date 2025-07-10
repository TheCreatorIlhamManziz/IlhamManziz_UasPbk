<template>
    <div class="auth-container">
      <h2>Register</h2>
      <form @submit.prevent="handleRegister" class="auth-form">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Daftar</button>
      </form>
      <p>Sudah punya akun? <RouterLink class="link" to="/login">Login di sini</RouterLink></p>
    </div>
  </template>
  
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { auth } from '../firebase'
  import { createUserWithEmailAndPassword } from 'firebase/auth'
  import { useUserStore } from '../stores/user'
  
  const email = ref('')
  const password = ref('')
  const router = useRouter()
  const userStore = useUserStore()
  
  onMounted(() => {
    userStore.loadUser()
    if (userStore.user) {
      router.push('/dashboard')
    }
  })
  
  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
      const user = userCredential.user
      alert('Registrasi berhasil! Silakan login.')
      router.push('/login')
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Email sudah terdaftar. Silakan login.')
        router.push('/login')
      } else {
        alert('Gagal registrasi: ' + error.message)
      }
    }
  }
  </script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 100px auto;
  background-color: #111;
  padding: 40px 30px; /* Lebih longgar kiri-kanan */
  border: 1px solid #0f0;
  border-radius: 10px;
  box-shadow: 0 0 20px #0f0;
  font-family: 'Courier New', monospace;
  color: #0f0;
  text-align: center;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 15px; /* Lebih longgar antar elemen */
  margin-bottom: 25px; /* Jarak ke link lupa password */
}

.auth-form input {
  background: #1f1f1f;
  border: 1px solid #0f0;
  color: #0f0;
  padding: 12px;
  border-radius: 5px;
  font-size: 1em;
}

.auth-form button {
  background-color: #0f0;
  color: #000;
  font-weight: bold;
  padding: 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
}

.auth-form button:hover {
  background-color: #4f4;
}

.link {
  color: #0f0;
  cursor: pointer;
  text-decoration: underline;
  display: inline-block;
  margin: 5px 0; /* Tambah jarak vertikal */
  font-size: 0.95em;
}

.link:hover {
  color: #9f0;
}
</style>
