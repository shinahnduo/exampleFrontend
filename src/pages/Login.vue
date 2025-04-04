<template>
  <div class="login-container">
    <h2>이메일과 비밀번호로 로그인</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">이메일:</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label for="password">비밀번호:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">로그인</button>
      <div v-if="error" class="error">{{ error }}</div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const error = ref(null)
    const router = useRouter()

    const handleLogin = async () => {
      try {
        error.value = null
        const response = await axios.post('http://localhost:8000/auth/login', {
          login_id: email.value,
          password: password.value
        })

        // 로그인 성공 시 /main 페이지로 이동
        if (response.data.token) {
          // 토큰을 로컬 스토리지에 저장 (선택 사항)
          localStorage.setItem('token', response.data.token)
          router.push('/main')
        }
      } catch (err) {
        error.value = err.response?.data?.detail || '로그인에 실패했습니다.'
        console.error('Login error:', err)
      }
    }

    return { email, password, handleLogin, error }
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
}

input {
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.error {
  color: red;
  text-align: center;
  margin-top: 10px;
}
</style>