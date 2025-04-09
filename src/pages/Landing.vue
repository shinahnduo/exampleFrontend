<template>
  <div class="landing-container">
    <div class="content">
      <div class="logo-section">
        <MomentoLogo class="logo" />
        <h1>Momento</h1>
        <p class="subtitle">Capture and cherish your moments</p>
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
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import MomentoLogo from '@/components/icons/MomentoLogo.vue';

export default defineComponent({
  name: 'Landing',
  setup() {
    const router = useRouter();

    const goToLogin = () => router.push('/login');
    const goToSignup = () => router.push('/signup');
    const redirectToGoogle = () => {
      const clientId = '1045727623358-v2o1k3kskfaeh8g3pajg2de5v0suvspv.apps.googleusercontent.com';
      const redirectUri = encodeURIComponent('http://localhost:8080/auth/callback');
      const scope = encodeURIComponent('email profile openid');
      const state = Math.random().toString(36).substring(2);

      const url =
        `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${clientId}` +
        `&redirect_uri=${redirectUri}` +
        `&response_type=token` +
        `&scope=${scope}` +
        `&include_granted_scopes=true` +
        `&state=${state}`;

      window.location.href = url;
    };

    return { goToLogin, goToSignup, redirectToGoogle };
  },
});
</script>

<style scoped>
.landing-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff; /* 배경색을 흰색으로 변경 */
  color: #000000; /* 폰트 색상을 검은색으로 변경 */
}

.content {
  text-align: center;
  padding: 2rem;
}

.logo-section {
  margin-bottom: 3rem;
}

.logo {
  width: 150px;
  height: auto;
  margin-bottom: 1rem;
}

h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #000000; /* 검은색 폰트 */
}

.subtitle {
  font-size: 1.2rem;
  color: #555555; /* 약간 연한 검은색으로 변경 */
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
  background-color: var(--primary-color);
  color: white;
}

.signup-button {
  background-color: transparent;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
}

.google-login-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--secondary-color);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.75rem;
  cursor: pointer;
  font-size: 1rem;
}

.google-login-button img {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}
</style>