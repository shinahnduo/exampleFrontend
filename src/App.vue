<template>
  <div id="app">
    <HeaderComponent v-if="showHeader" />
    <router-view />
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router';
import HeaderComponent from '@/components/HeaderComponent.vue';

export default defineComponent({
  name: 'App',
  components: {
    HeaderComponent,
  },
  setup() {
    const route = useRoute();

    // Header를 숨길 경로 설정
    const hiddenRoutes = ['/login', '/signup', '/'];
    const showHeader = computed(() => !hiddenRoutes.includes(route.path));

    return {
      showHeader,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>