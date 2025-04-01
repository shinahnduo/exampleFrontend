<template>
  <div class="header">
<!--    <img src="@/assets/logo.png" alt="logo" class="logo" />-->
<!--    <img src="@/assets/profile-icon.png" alt="profile" class="profile-icon" />-->
  </div>
  <div class="progress-bar">
    <div class="progress" :style="{ width: '16%' }"></div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
.logo {
  width: 50px;
}
.profile-icon {
  width: 24px;
  height: 24px;
}
.progress-bar {
  width: 100%;
  height: 4px;
  background: #ddd;
  border-radius: 2px;
  position: relative;
  margin-top: 8px;
}
.progress {
  height: 100%;
  background: black;
  border-radius: 2px;
}
</style>
<script setup lang="ts">
</script>