<template>
  <div class="container">
    <Header />

    <div class="content">
      <!-- 사진 업로드 -->
      <div class="upload-section">
        <div class="upload-box">
<!--          <img src="@/assets/upload-icon.png" alt="upload" class="upload-icon" />-->
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

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import OpenAI from "openai";
import Header from "@/components/Header.vue";
// import { useEnv } from '@/use/env';

const router = useRouter();

const title = ref("");
const description = ref("");
const aiContent = ref("");
const isLoading = ref(false);

// OpenAI 클라이언트 설정
const client = new OpenAI({
  // apiKey: useEnv().grokApiKey(), // API 키
  apiKey: 'test',
  baseURL: "https://api.x.ai/v1",
  dangerouslyAllowBrowser: true
});

// 이전 페이지로 이동
const goBack = () => {
  router.go(-1);
};

// AI 콘텐츠 생성 요청
const generateAIContent = async () => {
  if (!description.value.trim()) {
    alert("간단한 내용을 입력해주세요!");
    return;
  }

  isLoading.value = true;
  aiContent.value = "AI가 내용을 생성 중입니다...";

  try {
    const completion = await client.chat.completions.create({
      model: "grok-2-latest",
      messages: [
        { role: "system", content: "You are Grok, an AI assistant." },
        { role: "user", content: description.value }
      ]
    });

    const response = completion.choices[0]?.message || {};
    aiContent.value = response.content || "AI 콘텐츠 생성 실패";

    if (response.refusal) {
      console.warn("AI가 요청을 거부했습니다:", response.refusal);
    }
  } catch (error) {
    console.error("AI 생성 중 오류 발생:", error);
    aiContent.value = "AI 콘텐츠 생성 중 오류가 발생했습니다.";
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 360px;
  height: 740px;
  display: flex;
  flex-direction: column;
  background: #fff;
  overflow: hidden;
}

.content {
  flex-grow: 1;
  overflow: auto;
  padding: 16px;
}

.upload-section {
  background: #f9f9f9;
  padding: 16px;
  border-radius: 8px;
}
.upload-box {
  width: 100%;
  height: 120px;
  background: #e0e0e0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 8px;
}
.upload-icon {
  width: 24px;
  margin-bottom: 8px;
}
.input-box,
.textarea-box {
  width: 100%;
  height: 30px;
  padding: 8px;
  margin-top: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.textarea-box {
  height: 90px;
  resize: none;
}
.button-group {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

.ai-section {
  margin-top: 16px;
}
.ai-content-box {
  width: 100%;
  height: 240px;
  padding: 12px;
  background: #f0f0f0;
  border-radius: 4px;
}

.footer {
  display: flex;
  gap: 8px;
  padding: 16px;
  background: white;
  position: sticky;
  bottom: 0;
}
.gray-button,
.white-button,
.black-button,
.blue-button {
  flex: 1;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  font-size: 10px;
}
.gray-button {
  background: #ddd;
  border: none;
}
.white-button {
  background: white;
  border: 1px solid #ddd;
}
.black-button {
  background: black;
  color: white;
  border: none;
}
.blue-button {
  background: #4a90e2;
  color: white;
  border: none;
}
</style>
