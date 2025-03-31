<template>
  <div class="landing-container">
    <div class="content">
      <div class="logo-section">
        <h1>Better Write</h1>
        <p class="subtitle">Write Better, Together</p>
      </div>
      <div class="button-section">
        <button class="login-button" @click="goToLogin">로그인</button>
        <button class="signup-button" @click="goToSignup">회원가입</button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Landing',
  setup() {
    const router = useRouter()

    const goToLogin = () => router.push('/login')
    const goToSignup = () => router.push('/signup')

    return { goToLogin, goToSignup }
  }
})
</script>

<style scoped>
.landing-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a1a 0%, #2c3e50 100%);
  color: white;
}

.content {
  text-align: center;
  padding: 2rem;
}

.logo-section {
  margin-bottom: 3rem;
}

.logo {
  width: 80px;
  height: 80px;
  margin-bottom: 1rem;
}

h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.2rem;
  color: #a8a8a8;
}

.button-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 300px;
  margin: 0 auto;
}

button {
  padding: 1rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login-button {
  background-color: #4CAF50;
  color: white;
  border: none;
}

.login-button:hover {
  background-color: #45a049;
}

.signup-button {
  background-color: transparent;
  color: white;
  border: 2px solid white;
}

.signup-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>