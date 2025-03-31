<template>
  <div class="accordion-sub-list">
    <div v-for="(item, index) in items" :key="index" class="sub-item">
      <span>{{ item }}</span>
      <button @click="$emit('remove', index)">🗑️</button>
    </div>
    <button class="add-button" @click="$emit('add')">+ 항목 추가</button>
  </div>
</template>

<script>
export default {
  name: 'AccordionSubList',
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.accordion-sub-list {
  padding: 10px;
}

.sub-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  margin-bottom: 5px;
}

.add-button {
  width: 100%;
  padding: 5px;
  background: #f0f0f0;
  border: none;
  cursor: pointer;
  text-align: left;
}
</style>
