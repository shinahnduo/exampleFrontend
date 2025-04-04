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
        <button class="google-login-button" @click="redirectToGoogle">
          <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google Logo" />
          Google로 로그인
        </button>
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
    const redirectToGoogle = () => {
      const clientId = "1045727623358-v2o1k3kskfaeh8g3pajg2de5v0suvspv.apps.googleusercontent.com";
      const redirectUri = encodeURIComponent("http://localhost:8080/auth/callback");
      const scope = encodeURIComponent("email profile openid");
      const state = Math.random().toString(36).substring(2); // optional

      const url = `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${clientId}` +
        `&redirect_uri=${redirectUri}` +
        `&response_type=token` + // or "id_token token"
        `&scope=${scope}` +
        `&include_granted_scopes=true` +
        `&state=${state}`;

      window.location.href = url;
    }

    return { goToLogin, goToSignup, redirectToGoogle }
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
.google-login-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4285F4; /* Google 색상 */
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.75rem; /* 버튼 높이 조정 */
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.google-login-button img {
  width: 20px; /* 로고 크기 조정 */
  height: 20px; /* 로고 크기 조정 */
  margin-right: 8px;
}

.google-login-button:hover {
  background-color: #357ae8; /* 호버 색상 */
}
</style>