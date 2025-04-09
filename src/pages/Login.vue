<template>
  <!-- 부모 컨테이너 -->
  <div class="login-wrapper">
    <!-- 로그인 박스 -->
    <div class="login-container">
      <h2>로그인</h2>
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

        if (response.data.token) {
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
/* 부모 컨테이너: 화면 중앙 정렬을 위한 flex 세팅 */
.login-wrapper {
  display: flex;
  align-items: center;      /* 수직 중앙 */
  justify-content: center;  /* 수평 중앙 */
  height: 100vh;            /* 뷰포트 전체 높이 사용 */
  margin: 0;                /* 기본 여백 제거 */
  padding: 0;
}

/* 로그인 박스(카드) 스타일 */
.login-container {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 1rem;
}

/* 폼 구조 */
form {
  display: flex;
  flex-direction: column;
}

/* 라벨 + 인풋 간격 */
label {
  margin-bottom: 5px;
}

input {
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

/* 버튼 */
button {
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
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
