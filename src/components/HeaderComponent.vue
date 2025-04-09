<template>
  <div class="header">
    <div class="header-left">
      <img src="@/assets/logos/header_logo_160x160.png" alt="Header Logo" class="header-logo" @click="goToMainPage" />
      <h6>Momento</h6>
    </div>
    <div class="header-right">
      <button class="icon-button" @click="goBack">
        <IconBack />
      </button>
      <button class="icon-button">
        <IconChapter />
      </button>
      <button class="icon-button" @click="shareApp">
        <IconShare />
      </button>
      <button class="icon-button" @click="goToMyPage">
        <IconUser />
      </button>
      <DropdownMenu class="content" />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import IconBack from "@/components/icons/IconBack.vue";
import IconUser from "@/components/icons/IconUser.vue";
import IconShare from "@/components/icons/IconShare.vue";
import IconChapter from "@/components/icons/IconChapter.vue";
import DropdownMenu from "@/components/DropdownMenu.vue";

const router = useRouter();

// 메인 페이지로 이동
const goToMainPage = () => {
  router.push("/main");
};

// 이전 페이지 이동
const goBack = () => {
  router.back();
};

// 공유 기능
const shareApp = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: "Momento",
        text: "Momento 앱을 확인해보세요!",
        url: window.location.href,
      });
      console.log("공유 성공");
    } catch (error) {
      console.error("공유 실패:", error);
    }
  } else {
    alert("이 브라우저는 공유 기능을 지원하지 않습니다.");
  }
};

// 마이페이지로 이동
const goToMyPage = () => {
  router.push("/mypage");
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 12px 16px; /* 패딩 축소 */
  background-color: var(--primary-color); /* 메인 색상 */
  color: black; /* 텍스트 색상 */
  border-bottom: 2px solid #3e8e41; /* 하단 경계 */
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px; /* 간격 축소 */
}

.header-logo {
  width: 40px; /* 로고 크기 축소 */
  height: 40px;
  object-fit: contain; /* 로고 비율 유지 */
  cursor: pointer;
}

h6 {
  font-size: 1rem; /* 텍스트 크기 */
  font-weight: bold;
  margin: 0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 10px; /* 간격 축소 */
}

.icon-button {
  background: none;
  border: none;
  padding: 6px; /* 버튼 패딩 축소 */
  cursor: pointer;
  color: white; /* 아이콘 색상 */
  font-size: 1.2rem; /* 아이콘 크기 조정 */
  transition: transform var(--transition-speed);
}

.icon-button:hover {
  transform: scale(1.1); /* 호버 시 확대 효과 */
}

/* 반응형 디자인 */
@media (max-width: 320px) {
  .header {
    flex-direction: column; /* 화면이 매우 작을 때 세로 정렬 */
    align-items: center;
    padding: 8px; /* 패딩 축소 */
  }

  .header-left {
    flex-direction: column;
    align-items: center;
    gap: 4px; /* 간격 축소 */
  }

  .header-right {
    flex-wrap: wrap; /* 아이콘이 여러 줄로 배치되도록 설정 */
    justify-content: center;
    gap: 6px;
  }

  .header-logo {
    width: 32px; /* 더 작은 화면에서 로고 크기 조정 */
    height: 32px;
  }

  h6 {
    font-size: 0.8rem; /* 텍스트 크기 축소 */
  }

  .icon-button {
    font-size: 0.9rem; /* 아이콘 크기 축소 */
  }
}
</style>