<template>
  <div class="header">
  </div>
  <div class="progress-bar">
    <div class="progress" :style="{ width: '16%' }"></div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'Header'
})
</script>

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
