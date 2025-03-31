<template>
  <div class="read-container">
    <!-- 헤더 -->
    <Header />

    <!-- 제목 -->
    <h2 class="title">Chapter 1: 동방명주 관광</h2>

    <!-- 내용 -->
    <div class="content-box">
      <p>
        Sarah gazed out the frost-covered window, her breath creating small clouds on the glass.
        The winter morning was unusually quiet, with fresh snow blanketing the streets of Boston.
      </p>
      <p>
        The cursor on her laptop screen blinked steadily, matching the rhythm of her heartbeat.
        The outline was ready, characters were developed, and the world she had created in her mind
        was eager to spill onto the digital pages before her.
      </p>
      <p>
        "Chapter One," she typed, fingers hovering over the keyboard as memories of her research
        flooded back. The historical accuracy of 1920s speakeasies had to be perfect...
      </p>
    </div>

    <!-- 하단 버튼 -->
    <div class="footer">
      <button class="back-button" @click="goBack">뒤로가기</button>
      <button class="blue-button" @click="handleSave">저장</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Header from '@/components/page/Header.vue'

const router = useRouter()

const goBack = () => {
  router.go(-1)
}

const handleSave = () => {
  // 저장 로직 구현
  console.log('저장 기능 구현 예정')
}
</script>

<style scoped>
.read-container {
  width: 100%;
  max-width: 360px;
  height: 740px;
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 16px;
}

.title {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin: 16px 0;
}

.content-box {
  background: #f9f9f9;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
}

p {
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 8px;
}

/* 버튼 스타일 */
.footer {
  display: flex;
  gap: 8px;
  margin-top: auto;
}

.back-button {
  flex: 1;
  padding: 10px;
  background: #ddd;
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.blue-button {
  flex: 1;
  padding: 10px;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.back-button:hover {
  background: #bbb;
}

.blue-button:hover {
  background: #357abd;
}
</style>