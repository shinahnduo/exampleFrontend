<template>
  <div id="app">
    <HeaderComponent v-if="showHeader" />
    <router-view />
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useRoute } from 'vue-router';
import HeaderComponent from '@/components/HeaderComponent.vue';
import '@/assets/styles/global.css'; /* 글로벌 스타일 적용 */

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
  text-align: center;
  color: var(--text-color); /* 글로벌 변수 사용 */
}
</style>