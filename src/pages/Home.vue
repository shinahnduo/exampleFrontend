<template>
  <div>
    <HeaderComponent />
    <ScheduleList />
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import ScheduleList from '@/components/ScheduleList.vue';

export default {
  components: {
    HeaderComponent,
    ScheduleList,
  },
};
</script>

<style scoped>
/* 필요에 따라 스타일 추가 */
</style>