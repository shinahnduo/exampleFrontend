<template>
  <div class="footer">
    <!-- 버튼 그룹 -->
    <div class="button-group">
      <button class="footer-button">
        <IconDocument/>
        <span>원고</span>
      </button>
      <button class="footer-button">
        <IconUsers/>
        <span>등장인물</span>
      </button>
      <button class="footer-button">
        <IconBackground/>
        <span>배경</span>
      </button>
    </div>
    <!-- 발행하기 버튼 -->
    <button class="publish-button">
      <IconDocument/>
      <span>발행하기</span>
    </button>
  </div>
</template>

<script setup>
import IconDocument from "@/components/icons/IconDocument.vue";
import IconUsers from "@/components/icons/IconUsers.vue";
import IconBackground from "@/components/icons/IconBackground.vue";

defineOptions({
  name: 'FooterComponent'
})
</script>

<style scoped>
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px;
  background-color: #F1EBE4; /* 배경색 */
}

.button-group {
  display: flex;
  gap: 12px; /* 버튼 간격 */
}

.footer-button {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px; /* 버튼 모서리 둥글게 */
  padding-left: 16px;
  cursor: pointer;
  font-weight: 1000;
}

.footer-button img {
  width: 24px; /* 아이콘 크기 */
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
  background-color: #6a4dfd; /* 보라색 배경 */
  color: #ffffff; /* 텍스트 색상 */
  font-size: 12px;
  font-weight: bold;
  border-radius: 24px; /* 버튼 모서리 둥글게 */
  padding: 8px 12px;
  border: none;
  cursor: pointer;
}

.publish-button img {
  width: 16px; /* 아이콘 크기 */
  height: auto;
}
</style>
