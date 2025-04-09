<template>
  <div class="read-container">
    <!-- 헤더 -->
    <Header />

    <!-- 제목 -->
    <h2 class="title">{{ chapterData.title || "Loading..." }}</h2>

    <!-- 내용 -->
    <div class="content-box">
      <p v-if="chapterData.content">
        {{ chapterData.content }}
      </p>
      <p v-else>
        데이터를 불러오는 중입니다...
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
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import Header from "@/components/Header.vue";

const router = useRouter();
const route = useRoute();

console.log(route.params.detailId);
console.log('here?');
const detailId = route.params.detailId; // 전달받은 detailId
const chapterData = ref({}); // 조회한 데이터를 저장할 상태

// 뒤로가기 버튼
const goBack = () => {
  router.go(-1);
};

// 저장 버튼 (추후 구현)
const handleSave = () => {
  console.log("저장 기능 구현 예정");
};

// 백엔드에서 detailId를 기반으로 데이터 조회
const fetchChapterDetail = async () => {
  try {
    const token = localStorage.getItem("jwt_token");
    if (!token) throw new Error("로그인이 필요합니다.");

    const response = await axios.get(`http://localhost:8000/chapter/detail/${detailId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    chapterData.value = response.data; // 조회한 데이터를 상태에 저장
    console.log("챕터 데이터 조회 성공 ✅", response.data);
  } catch (error) {
    console.error("챕터 데이터 조회 실패 ❌", error);
    alert("데이터를 불러오는 중 오류가 발생했습니다.");
  }
};

// 컴포넌트가 로드될 때 데이터 조회
onMounted(() => {
  if (detailId) {
    fetchChapterDetail();
  } 
  // else {
  //   console.error("detailId가 전달되지 않았습니다.");
  //   alert("잘못된 접근입니다.");
  //   router.push("/"); // 잘못된 접근 시 메인 페이지로 이동
  // }
});
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