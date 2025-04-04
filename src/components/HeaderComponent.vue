<template>
  <div class="header">
    <div class="header-left">
      <button class="publish-button">
        <IconBack />
      </button>
      <button class="publish-button">
        <IconChapter />
      </button>
      <h6>제 1장: 블라블라</h6>
    </div>
    <div class="header-right">
      <button class="icon-button">
        <IconShare />
      </button>
      <button class="icon-button">
        <IconUser />
      </button>
      <DropdownMenu class="content" />
    </div>
  </div>
</template>

<script setup>
import IconBack from "@/components/icons/IconBack.vue";
import IconUser from "@/components/icons/IconUser.vue";
import IconShare from "@/components/icons/IconShare.vue";
import IconChapter from "@/components/icons/IconChapter.vue";
import DropdownMenu from "@/components/DropdownMenu.vue";
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px;
  background-color: #4CAF50; /* 통일된 색상 */
  color: black; /* 텍스트 색상 */
  border-bottom: 2px solid #3e8e41; /* 강조된 하단 경계 */
}

.header-left {
  display: flex;
  gap: 16px;
  font-size: 15px;
  font-weight: bold;
}

.header-right {
  display: flex;
  gap: 8px;
}

.icon-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: white; /* 아이콘 색상 */
}

.icon-button img {
  width: 24px;
  height: 24px;
}

/* 반응형 디자인 추가 */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-left {
    margin-bottom: 8px;
  }

  .header-right {
    justify-content: flex-end;
    width: 100%;
  }
}
</style>