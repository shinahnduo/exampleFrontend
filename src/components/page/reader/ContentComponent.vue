<template>
  <div class="content">
    <div class="content-wrapper">
      <div class="text-content">
        {{ content }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ContentComponent',
  setup() {
    const content = ref('여기에 본문 내용이 들어갑니다.')

    return {
      content
    }
  }
}
</script>

<style scoped>
.content {
  width: 100%;
  height: 100%;
  padding: 20px;
  overflow-y: auto;
}

.content-wrapper {
  max-width: 800px;
  margin: 0 auto;
}

.text-content {
  line-height: 1.6;
  font-size: 16px;
  color: #333;
}
</style>
