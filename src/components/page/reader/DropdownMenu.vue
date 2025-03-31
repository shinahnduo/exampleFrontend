<template>
  <div class="dropdown">
    <button class="dropdown-button" @click="toggleDropdown">
      메뉴
      <span class="arrow">{{ isOpen ? '▼' : '▶' }}</span>
    </button>
    <div v-if="isOpen" class="dropdown-content">
      <a href="#" @click.prevent="handleOption('option1')">옵션 1</a>
      <a href="#" @click.prevent="handleOption('option2')">옵션 2</a>
      <a href="#" @click.prevent="handleOption('option3')">옵션 3</a>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'DropdownMenu',
  setup() {
    const isOpen = ref(false)

    const toggleDropdown = () => {
      isOpen.value = !isOpen.value
    }

    const handleOption = (option) => {
      console.log('Selected option:', option)
      isOpen.value = false
    }

    return {
      isOpen,
      toggleDropdown,
      handleOption
    }
  }
}
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.dropdown-content {
  position: absolute;
  right: 0;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  border-radius: 4px;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.arrow {
  font-size: 12px;
}
</style>
