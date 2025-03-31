<!-- filepath: /c:/aiProject/betterwrite/packages/app/src/pages/Main.vue -->
<template>
  <div class="main-container">
    <!-- Header with Search Bar -->
    <header class="header">
      <div class="notification-icon">
        <IconHeart />
        <span class="notification-count">2</span>
      </div>
      <input type="text" v-model="searchQuery" placeholder="Search" class="search-bar" />
      <IconMenu />
    </header>

    <!-- Filter and List -->
    <div class="filter-container">
      <button class="filter-button">내 서재</button>
      <button class="filter-button">필터</button>
    </div>

    <ul class="item-list">
      <li v-for="item in filteredItems" :key="item.id" class="item" @click="goToDetail(item.id)">
        <img :src="item.image" alt="Item Image" class="item-image" />
        <div class="item-content">
          <h3 class="item-title">{{ item.title }}</h3>
          <p class="item-subtitle">{{ item.subtitle }}</p>
          <div class="item-tags">
            <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>
      </li>
    </ul>

    <!-- Bottom Navigation -->
    <nav class="bottom-nav">
      <button class="nav-button"><IconHome />홈</button>
      <button class="nav-button"><IconSearch />검색</button>
      <button class="nav-button"><IconBook />내 서재</button>
      <button class="nav-button"><IconSettings />환경설정</button>
    </nav>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import IconHeart from '@/components/icons/IconHeart.vue'
import IconMenu from '@/components/icons/IconMenu.vue'
import IconHome from '@/components/icons/IconHome.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import IconBook from '@/components/icons/IconBook.vue'
import IconSettings from '@/components/icons/IconSettings.vue'

export default {
  name: 'Main',
  components: {
    IconHeart,
    IconMenu,
    IconHome,
    IconSearch,
    IconBook,
    IconSettings
  },
  setup() {
    const router = useRouter()
    const searchQuery = ref('')
    const items = ref([
      { id: 1, title: 'Item 1', subtitle: 'Subtitle 1', tags: ['tag1', 'tag2'], image: 'path/to/image1.jpg' },
      { id: 2, title: 'Item 2', subtitle: 'Subtitle 2', tags: ['tag3', 'tag4'], image: 'path/to/image2.jpg' }
    ])

    const filteredItems = computed(() => {
      return items.value.filter(item =>
        item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    })

    const goToDetail = (id) => {
      router.push({ name: 'Detail', params: { id } })
    }

    return {
      searchQuery,
      filteredItems,
      goToDetail
    }
  }
}
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #f1f1f1;
}

.notification-icon {
  position: relative;
}

.notification-count {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 2px 5px;
  font-size: 12px;
}

.search-bar {
  flex: 1;
  margin: 0 16px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.filter-container {
  display: flex;
  gap: 8px;
  padding: 16px;
}

.filter-button {
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: none;
  cursor: pointer;
}

.item-list {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  list-style: none;
}

.item {
  display: flex;
  gap: 16px;
  padding: 16px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
}

.item-content {
  flex: 1;
}

.item-title {
  margin: 0 0 8px 0;
  font-size: 16px;
}

.item-subtitle {
  margin: 0 0 8px 0;
  color: #666;
}

.item-tags {
  display: flex;
  gap: 8px;
}

.tag {
  padding: 4px 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
  font-size: 12px;
}

.bottom-nav {
  display: flex;
  justify-content: space-around;
  padding: 16px;
  background-color: #f1f1f1;
  border-top: 1px solid #ddd;
}

.nav-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
}
</style>