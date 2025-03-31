<template>
  <div class="detail-container">
    <button @click="goBack">Back</button>
    <img :src="item.image" alt="Item Image" class="detail-image" />
    <h2>{{ item.title }}</h2>
    <p>{{ item.subtitle }}</p>
    <div class="tags">
      <span v-for="tag in item.tags" :key="tag">{{ tag }}</span>
    </div>
    <div class="description">
      <h3>Description</h3>
      <p>{{ item.description }}</p>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'Detail',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const item = ref({})

    const goBack = () => {
      router.back()
    }

    onMounted(() => {
      const itemId = route.params.id
      // Fetch or find the item by ID
      // Example: item.value = fetchItemById(itemId);
      
      // 임시 데이터 (실제로는 API나 store에서 가져와야 함)
      item.value = {
        image: 'path/to/image.jpg',
        title: 'Item Title',
        subtitle: 'Item Subtitle',
        tags: ['tag1', 'tag2'],
        description: 'Item description goes here'
      }
    })

    return {
      item,
      goBack
    }
  }
})
</script>

<style scoped>
.detail-container {
  padding: 16px;
}

.detail-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.tags {
  display: flex;
  gap: 8px;
}

.description {
  margin-top: 16px;
}
</style>