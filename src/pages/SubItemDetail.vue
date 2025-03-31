<template>
  <div class="container">
    <Header />

    <div class="content">
      <!-- 사진 업로드 -->
      <div class="upload-section">
        <div class="upload-box">
          <span>사진 업로드</span>
        </div>
        <input v-model="title" type="text" placeholder="제목을 입력하세요" class="input-box" />
        <textarea v-model="description" placeholder="간단한 내용을 입력하세요" class="textarea-box"></textarea>
        <div class="button-group">
          <button class="gray-button">유지</button>
          <button class="white-button" @click="generateAIContent" :disabled="isLoading">
            {{ isLoading ? "생성 중..." : "AI 생성" }}
          </button>
        </div>
      </div>

      <!-- AI 생성 콘텐츠 -->
      <div class="ai-section">
        <h3>AI 생성 콘텐츠</h3>
        <div class="ai-content-box">
          {{ aiContent || "AI가 생성한 콘텐츠가 여기에 표시됩니다." }}
        </div>
      </div>
    </div>

    <!-- 하단 버튼 -->
    <div class="footer">
      <button class="gray-button">임시저장</button>
      <button class="white-button" @click="goBack">작성 취소</button>
      <button class="black-button">다음 단계</button>
      <button class="blue-button">끝내기</button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import OpenAI from 'openai'
import Header from '@/components/page/reader/HeaderComponent.vue'
import { useEnv } from '../env.js'

export default defineComponent({
  name: 'SubItemDetail',
  components: {
    Header
  },
  setup() {
    const router = useRouter()
    const title = ref('')
    const description = ref('')
    const aiContent = ref('')
    const isLoading = ref(false)

    // OpenAI 클라이언트 설정
    const client = new OpenAI({
      apiKey: useEnv().grokApiKey(),
      baseURL: 'https://api.x.ai/v1',
      dangerouslyAllowBrowser: true
    })

    // 이전 페이지로 이동
    const goBack = () => {
      router.go(-1)
    }

    // AI 콘텐츠 생성 요청
    const generateAIContent = async () => {
      if (!description.value.trim()) {
        alert('간단한 내용을 입력해주세요!')
        return
      }

      isLoading.value = true
      aiContent.value = 'AI가 내용을 생성 중입니다...' // 로딩 메시지

      try {
        const completion = await client.chat.completions.create({
          model: 'grok-2-latest',
          messages: [
            {
              role: 'system',
              content: 'You are Grok, an AI assistant.',
            },
            {
              role: 'user',
              content: description.value,
            },
          ],
        })

        const response = completion.choices[0]?.message || {}
        aiContent.value = response.content || 'AI 콘텐츠 생성 실패'

        if (response.refusal) {
          console.warn('AI가 요청을 거부했습니다:', response.refusal)
        }
      } catch (error) {
        console.error('AI 생성 중 오류 발생:', error)
        aiContent.value = 'AI 콘텐츠 생성 중 오류가 발생했습니다.'
      } finally {
        isLoading.value = false
      }
    }

    return {
      title,
      description,
      aiContent,
      isLoading,
      goBack,
      generateAIContent
    }
  }
})
</script>

<style scoped>
/* 스타일은 그대로 유지 */
</style>