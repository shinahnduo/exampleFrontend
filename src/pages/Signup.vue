<template>
  <div class="signup-container">
    <h2>회원가입</h2>
    <form @submit.prevent="onSubmit">
      <input v-model="formData.login_id" type="text" placeholder="아이디" required />
      <input v-model="formData.password" type="password" placeholder="비밀번호" required />
      <input v-model="formData.email" type="email" placeholder="이메일" required />
      <input v-model="formData.phone" type="tel" placeholder="전화번호" required />
      <input v-model="formData.user_name" type="text" placeholder="이름" required />
      <textarea v-model="formData.description" placeholder="자기소개"></textarea>
      <button type="submit">가입하기</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Signup',
  setup() {
    const router = useRouter()
    const errorMessage = ref('')
    const formData = ref({
      author_id: '',
      created_at: new Date().toISOString(),
      email: '',
      login_id: '',
      password: '',
      phone: '',
      updated_at: new Date().toISOString(),
      user_id: Date.now(), // 임시 ID 생성
      user_name: '',
      description: ''
    })

    const onSubmit = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/auth/singup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData.value)
        })

        if (response.ok) {
          router.push('/login')
        } else {
          const error = await response.json()
          throw new Error(error.detail)
        }
      } catch (error) {
        console.error('Error:', error)
        errorMessage.value = error.message || '회원가입에 실패했습니다.'
      }
    }

    return {
      formData,
      errorMessage,
      onSubmit
    }
  }
})
</script>

<style scoped>
.signup-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f9f9f9;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
}

input, textarea {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

textarea {
  height: 100px;
  resize: vertical;
}

button {
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>