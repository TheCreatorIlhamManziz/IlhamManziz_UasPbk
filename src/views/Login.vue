<template>
    <div class="auth-container">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin" class="auth-form">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Masuk</button>
      </form>
  
      <p>
        <button @click="forgotPassword" class="link">
          Lupa password?
        </button>
      </p>
  
      <p>Belum punya akun? <RouterLink class="link" to="/register">Daftar di sini</RouterLink></p>
    </div>
  </template>  
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '../stores/user'
  import { auth } from '../firebase'
  import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'
  
  const email = ref('')
  const password = ref('')
  const router = useRouter()
  const userStore = useUserStore()
  
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
      const user = userCredential.user
      userStore.setUser({ email: user.email, uid: user.uid })
      alert('Login berhasil!')
      router.push('/dashboard')
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        alert('Akun tidak ditemukan. Silakan daftar dulu.')
        router.push('/register')
      } else {
        alert('Email atau password salah!')
      }
    }
  }
  
  const forgotPassword = async () => {
    if (!email.value) {
      alert('Masukkan email terlebih dahulu untuk reset password.')
      return
    }
    try {
      await sendPasswordResetEmail(auth, email.value)
      alert(`Link reset password telah dikirim ke ${email.value}`)
    } catch (error) {
      alert('Gagal mengirim email reset password.')
      console.error(error)
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
