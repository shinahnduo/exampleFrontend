<template>
  <div class="footer">
    <!-- 버튼 그룹 -->
    <div class="button-group">
      <button class="footer-button">
        <IconDocument />
        <span>원고</span>
      </button>
      <button class="footer-button">
        <IconUsers />
        <span>등장인물</span>
      </button>
      <button class="footer-button">
        <IconBackground />
        <span>배경</span>
      </button>
    </div>
    <!-- 발행하기 버튼 -->
    <button class="publish-button">
      <IconDocument />
      <span>발행하기</span>
    </button>
  </div>
</template>

<script setup>
import IconDocument from "@/components/icons/IconDocument.vue";
import IconUsers from "@/components/icons/IconUsers.vue";
import IconBackground from "@/components/icons/IconBackground.vue";
</script>

<style scoped>
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px;
  background-color: #f1ebe4;
}

.button-group {
  display: flex;
  gap: 12px;
}

.footer-button {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px;
  padding-left: 16px;
  cursor: pointer;
  font-weight: 1000;
}

.footer-button img {
  width: 24px;
  height: 24px;
}

.footer-button span {
  margin-left: 2px;
  margin-top: 4px;
  font-size: 12px;
}

.publish-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #6a4dfd;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  border-radius: 24px;
  padding: 8px 12px;
  border: none;
  cursor: pointer;
}

.publish-button img {
  width: 16px;
  height: auto;
}
</style>
